<template>
	<div>
		<!-- AVISO DE ERRO NA REQUISIÇÃO -->
		<div v-if="hasError" class="alert alert-danger">
			Ocorreu um erro durante a consulta aos dados.
			<button type="button" class="btn btn-danger btn-xs pull-right" @click="fetchData">
				<i class="fa fa-exclamation-triangle"></i> Tentar Novamente
			</button>
		</div>

		<!-- FULLSEARCH FIELDS -->
		<template v-if="fullSearchFieldsAvailable">
			<div class="checkbox">
				Selecione os campos para pesquisa:
				<label v-for="fsf in fullSearchFields" class="checkbox-inline" :key="fsf.id">
					<input type="checkbox" :value="fsf.id" v-model="userFullSearchFields"> {{fsf.name}}
				</label>
			</div>
			<div class="form-group">
				<div class="input-group">
					<input
						type="text"
						class="form-control"
						placeholder="Pesquisa..."
						maxlength="100"
						v-model="userFullSearchValue"
						@keyup.enter="applyFullSearch"
					>
					<span class="input-group-btn">
						<button type="button" class="btn btn-default" @click="applyFullSearch">
							<i class="fa fa-search"></i>
						</button>
					</span>
				</div>
				<div v-if="currentFullSearch" class="help-block">
					Pesquisando por <i><u>{{currentFullSearch.value}}</u></i> no(s) campo(s) <i><u>{{currentFullSearch.fields}}</u></i>.
				</div>
				<div v-else class="help-block">Nenhuma pesquisa aplicada.</div>
			</div>
		</template>

		<!-- SLOT PARA FILTER FIELDS -->
		<slot name="filters"></slot>

		<!-- AVISO DE NENHUM RESULTADO -->
		<div v-if="!loadingData && isEmpty" class="alert alert-warning">
			Nenhum registro para exibição.
		</div>

		<!-- TABELA DE DADOS PAGINADOS -->
		<slot name="table" :fields="fields" :items="itemList">
			<table v-show="!isEmpty" class="v-paginator-table table table-bordered table-condensed table-hover">

				<!-- HEADER COM ORDENAÇÃO -->
				<thead class="v-paginator-header">
					<tr>
						<th
							v-for="field in fields"
							:key="field.id"
							@click="applySort(field.id, $event)"
							class="text-center"
							style="white-space: nowrap;"
							:style="field.style || ''"
						>
							{{field.name}}
							<i v-show="field.sortOrder=='asc'" class="fa fa-sort-alpha-asc"></i>
							<i v-show="field.sortOrder=='desc'" class="fa fa-sort-alpha-desc"></i>
							<sup>{{field.sortIndex}}</sup>
						</th>
						<slot name="extraHeaders"></slot>
					</tr>
				</thead>

				<!-- DADOS DA PAGINAÇÃO -->
				<tbody class="v-paginator-body">
					<template v-for="item in itemList">
						<slot name="rows" :item="item">
							<tr @click="$emit('rowClick', item)">
								<td v-for="field in fields" class="text-center" :key="field.id">
									{{ getProperty(item, field.id) }}
								</td>
							</tr>
						</slot>
					</template>
				</tbody>

			</table>
		</slot>

		<!-- FOOTER COM CONTROLES DE PAGINAÇÃO -->
		<div class="v-paginator-footer">
			<div class="row">
				<div class="col-sm-12 col-md-3"  style="margin-bottom: 5px;">
					<select class="form-control input-sm" v-model.number="userItemsPerPage" :disabled="isEmpty">
						<option value="10">10 por página</option>
						<option value="20">20 por página</option>
						<option value="25">25 por página</option>
						<option value="50">50 por página</option>
						<option value="100">100 por página</option>
						<option value="-1">Exibir todos</option>
					</select>
				</div>
				<div class="col-xs-6 col-sm-8 col-md-6">
					<p class="form-control-static text-center text-muted">
						<span class="hidden-xs">
							Página {{currentPage}} de {{pageCount}}
							/ Registro {{itemOffset}} à {{finalItemOffset}} de {{itemCount}}
						</span>
						<span class="visible-xs-inline">
							Pg. {{currentPage}} de {{pageCount}}
							({{itemOffset}}-{{finalItemOffset}}/{{itemCount}})
						</span>
					</p>
				</div>
				<div class="col-xs-6 col-sm-4 col-md-3">
					<div class="pull-right">
						<button type="button" class="btn btn-default btn-sm" :disabled="!canGoToPreviousPage" @click="goToFirstPage">
							<span class="hidden-xs">Primeira</span>
							<span class="visible-xs-inline"><i class="fa fa-fast-backward"></i></span>
						</button>
						<button type="button" class="btn btn-default btn-sm" :disabled="!canGoToPreviousPage" @click="goToPreviousPage">
							<i class="fa fa-chevron-left"></i>
						</button>
						<button type="button" class="btn btn-default btn-sm" :disabled="!canGoToNextPage" @click="goToNextPage">
							<i class="fa fa-chevron-right"></i>
						</button>
						<button type="button" class="btn btn-default btn-sm" :disabled="!canGoToNextPage" @click="goToLastPage">
							<span class="hidden-xs">Última</span>
							<span class="visible-xs-inline"><i class="fa fa-fast-forward"></i></span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import $ from 'jquery';

	let ffOperator = String.raw`(=|!=|\*|%|>=|>|<=|<)`;
	let ffExpression = String.raw`(\w+\.)*(\w)+${ffOperator}.+`;
	let ffExpressionList = String.raw`^${ffExpression}(,${ffExpression})*$`;
	let ffOperatorReg = new RegExp(ffOperator);
	let ffExpressionReg = new RegExp(ffExpression);
	let ffExpressionListReg = new RegExp(ffExpressionList);

	export default {
		props: {
			url: { default: undefined },
			urlAccess: { default: true },
			config: { default: undefined },
			fields: { default: () => [] },
			footerColspan: { default: null },
			filterFields: { default: () => {} }
		},

		data() {
			return {
				/* Campos Internos */
				fieldsMap: null,
				userSortFields: new Map(),
				userFullSearchFields: [],
				userFullSearchValue: '',
				loadingConfig: false,
				loadingData: false,
				hasError: false,

				/* Enviados ao Back-end */
				page: 1,
				items_per_page: 10,
				show_all_items: false,
				sort_fields: '',
				filter_fields: '',
				fullsearch_fields: '',
				fullsearch_value: '',

				/* Recebidos do Back-end */
				pageCount: 0,
				currentPage: 0,
				itemCount: 0,
				itemOffset: 0,
				itemList: [],
			};
		},

		computed: {
			footerColspanValue() {
				return this.footerColspan || this.fields.length;
			},

			isEmpty() {
				return this.itemCount == 0;
			},

			canGoToPreviousPage() {
				return this.currentPage > 1;
			},

			canGoToNextPage() {
				return this.currentPage < this.pageCount;
			},

			finalItemOffset() {
				if (this.show_all_items) {
					return this.itemCount;
				} else {
					let finalOffset = this.itemOffset + this.items_per_page - 1;
					return (finalOffset < this.itemCount) ? finalOffset : this.itemCount;
				}
			},

			userItemsPerPage: {
				get() {
					return (this.show_all_items) ? -1 : this.items_per_page;
				},
				set(newValue) {
					if (newValue == -1) {
						this.show_all_items = true;
					} else {
						this.show_all_items = false;
						this.items_per_page = newValue;
					}
				}
			},

			sortFields() {
				return this.fields.filter(f => f.sort == true);
			},

			fullSearchFields() {
				return this.fields.filter(f => f.fullSearch == true);
			},

			fullSearchFieldsAvailable() {
				return this.fullSearchFields.length > 0;
			},

			currentFullSearch() {
				if (this.fullsearch_fields && this.fullsearch_value) {
					return {
						fields: this.fullsearch_fields.split(',').map(f => this.fieldsMap.get(f).name).join(', '),
						value: this.fullsearch_value
					};
				} else {
					return null;
				}
			}
		},

		watch: {
			page() {
				this.fetchData();
			},

			userItemsPerPage: function() {
				this.fetchData();
			},

			filterFields: {
				deep: true,
				handler: function() {
					this.filter_fields = this.filterFieldsToString(this.filterFields);
				}
			},

			filter_fields() {
				this.fetchData();
			}
		},

		methods: {
			loadConfig() {
				let config = null;

				if (this.urlAccess) {
					config = this.$route.query;
				} else {
					config = this.config;
				}

				if (!config) {
					return;
				}

				this.loadingConfig = true;

				if (config.p && /^\d+$/.test(config.p)) {
					this.page = parseInt(config.p, 10);
				}

				if (config.ipp && ['10', '20', '25', '50', '100'].indexOf(config.ipp) >= 0) {
					this.items_per_page = parseInt(config.ipp, 10);
				}

				if (config.sai && (config.sai == 'true' || config.sai == 'false')) {
					this.show_all_items = (config.sai == 'true');
				}

				if (config.sf && /^\w+:(asc|desc)(,\w+:(asc|desc))*$/.test(config.sf )) {
					config.sf.split(',').forEach(s => {
						var sParts = s.split(':');
						var field = sParts[0];
						var order = sParts[1];
						if (this.fieldsMap.has(field)) {
							this.applySort(field);
							if (order == 'desc') {
								this.applySort(field);
							}
							
						}
					});
				}

				if (config.ff && ffExpressionListReg.test(config.ff)) {
					let ffObject = this.filterFieldsToObject(config.ff);
					this.filter_fields = this.filterFieldsToString(ffObject);
					this.$emit('update:filterFields', ffObject);
				}

				if (config.fsf && /^\w+(,\w+)*$/.test(config.fsf)) {
					this.userFullSearchFields = [];
					config.fsf.split(',').forEach(f => {
						if (this.fieldsMap.has(f)) {
							this.userFullSearchFields.push(f);
						}
					});
				}

				if (config.fsv) {
					this.userFullSearchValue = config.fsv.slice(0, 100);
				}

				this.applyFullSearch();

				this.loadingConfig = false;
			},

			storeConfig() {
				let config = {
					p: this.page,
					ipp: this.items_per_page,
					sai: this.show_all_items,
					sf: this.sort_fields,
					ff: this.filter_fields,
					fsf: this.fullsearch_fields,
					fsv: this.fullsearch_value
				};


				if (this.urlAccess) {
					this.$router.replace({ query: config });
				} else {
					this.$emit('update:config', config);
				}
			},

			applyFullSearch() {
				if (this.userFullSearchFields.length > 0 && this.userFullSearchValue) {
					this.fullsearch_fields = this.userFullSearchFields.join(',');
					this.fullsearch_value = this.userFullSearchValue;
				} else {
					this.fullsearch_fields = '';
					this.fullsearch_value = '';
				}

				this.fetchData();
			},

			applySort(field, event) {

				// Verifica se o campo é ordenável.
				if (!this.fieldsMap.get(field).sort) {
					return;
				}

				/* Inverte a ordem do campo se ele já estiver na ordenação ou usa a ordem padrão. */
				var order = this.userSortFields.get(field); 
				if (order) {
					order = (order == 'asc') ? 'desc': 'asc';
				} else {
					order = 'asc';
				}

				// Remove o campo da ordenação.
				if (!event || event.ctrlKey) {
					this.userSortFields.delete(field);
				}
				// Limpa todos os campos da ordenação.
				else {
					this.userSortFields.clear();
					this.fields.forEach( s =>s.sortOrder = null);
				}

				/* Adiciona o campo na ordenção. */
				this.userSortFields.set(field, order);
				this.fieldsMap.get(field).sortOrder = order;

				/* Recalcula o índice de todos os campos da ordenação. */
				let keys = [...this.userSortFields.keys()];
				this.fields.forEach(f => {
					let index = keys.indexOf(f.id);
					f.sortIndex = (index == -1) ? null : index+1;
				});

				/* Atribuí o filtro de ordenação do back-end. */
				this.sort_fields = [...this.userSortFields]
					.map(s => s[0] + ':' + s[1])
					.join(',');

				this.fetchData();
			},

			async fetchData() {
				if (this.loadingConfig) {
					return;
				}

				let parameters = {
					page: this.page,
					items_per_page: this.items_per_page,
					show_all_items: this.show_all_items
				};

				if (this.sort_fields) {
					parameters.sort_fields = this.sort_fields;
				}

				if (this.filter_fields) {
					parameters.filter_fields = this.filter_fields;
				}

				if (this.fullsearch_value) {
					parameters.fullsearch_fields = this.fullsearch_fields;
					parameters.fullsearch_value = this.fullsearch_value;
				}

				this.storeConfig();

				try {
					this.loadingData = true;
					let data = await $.get(this.url, parameters);
					
					if (data.itemCount > 0) {
						this.pageCount = data.pageCount;
						this.currentPage = data.currentPage;
						this.itemCount = data.itemCount;
						this.itemOffset = data.itemOffset;
						this.itemList = data.itemList;
						// Em algumas situações o back-end retorna o "itemOffset" com valor "0".
						if (this.itemOffset == 0) {
							this.itemOffset = 1;
						}
					}
					// Ajusta os valores do back-end quando não há resultados.
					else {
						this.pageCount = 0;
						this.currentPage = 0;
						this.itemCount = 0;
						this.itemOffset = 0;
						this.itemList = [];
					}
				
					this.hasError = false;
				} catch(e) {
					this.hasError = true;
				} finally {
					// Ajusta a página atual solicitada, caso o número total de páginas tenha sido alterado.
					if (this.page > this.pageCount) {
						this.page = (this.pageCount > 0) ? this.pageCount : 1;
					}
					this.loadingData = false;
				}
			},

			goToFirstPage() {
				this.page = 1;
			},

			goToPreviousPage() {
				if (this.page > 1) {
					this.page--;
				}
			},

			goToNextPage() {
				if (this.page < this.pageCount) {
					this.page++;
				}
			},

			goToLastPage() {
				this.page = (this.pageCount > 0) ? this.pageCount : 1;
			},

			filterFieldsToObject(filterFieldsString) {
				let filterFields = {};
				filterFieldsString
					.split(',')
					.forEach(ff => {
						let parts = ff.split(ffOperatorReg);
						if (this.fieldsMap.has(parts[0])) {
							filterFields[parts[0]] = {
								op: parts[1],
								value: parts[2]
							};
						}
					});
				return filterFields;
			},

			filterFieldsToString(filterFieldsObject) {
				if (!filterFieldsObject) {
					return null;
				}

				return Object.keys(filterFieldsObject)
					.map(key => {
						let ff = filterFieldsObject[key];
						if (ff.op && ff.value != null && ff.value != undefined) {
							return `${key}${ff.op}${ff.value}`;
						} else {
							return '';
						}
					})
					.filter(ff => ffExpressionReg.test(ff))
					.join(',');
			},

			getProperty(object, property) {
				let data = object;
				property.split('.').forEach(p => data = data[p]);
				return data;
			}
		},

		created() {
			this.fieldsMap = new Map(this.fields.map(s => [s.id, s]));
			this.userFullSearchFields = this.fullSearchFields.map(s => s.id);
			this.loadConfig();
			this.$nextTick(() => this.fetchData());
		}
	};
</script>

<style scoped>
	.v-paginator-table + .v-paginator-footer {
		margin-top: -16px;
		padding: 15px;
		border-radius: 0 0 4px 4px;
		background-color: #ddd;
	}

	.v-paginator-header  {
		user-select: none;
		cursor: pointer;
		background-color: #ddd;
	}

	.v-paginator-body {
		background-color: #fff
	}
</style>