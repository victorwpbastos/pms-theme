<template>
	<div class="box">
		<div v-if="linhaSelecionada">{{linhaSelecionada}}</div>

		<v-data-table :url="url" :fields="fields" :filterFields.sync="filterFields" @rowClick="rowClick">
			
			<!-- <div slot="filters" class="painel-filtros">
				<span style="margin-right: 5px;">
					<span class="fa fa-filter" style="margin-top: 10px;"></span> Filtros
				</span>
				<div class="pull-right">
					<select v-model="filtroModalidade" class="form-control">
						<option :value="null">Exibir Todos</option>
						<option value="Convite">Convite</option>
						<option value="Pregão Presencial">Pregão Presencial</option>
						<option value="Leilão">Leilão</option>
						<option value="Concorrência">Concorrência</option>
					</select>
				</div>
				<input type="text" v-model="filtroObjeto"></input>
				<div class="clearfix"></div>
			</div> -->

			<template slot="table" slot-scope="x">
				asdfsdf
				{{x}}
			</template>
		</v-data-table>
	</div>
</template>

<script>
	import VDataTable from 'components/dataTable';

	export default {
		components: { VDataTable },

		data: function() {
			return {
				url: 'http://localhost:3000/api/publicacao',
				fields: [
					{ id: 'codigoProcesso',                name: 'PROCESSO',   sort: true, fullSearch: true, style: 'width: 250px;' },
					{ id: 'dataAbertura',                  name: 'ABERTURA',   sort: true, fullSearch: true, style: '' },
					{ id: 'statusPublicacaoProcesso.nome', name: 'STATUS',     sort: true, fullSearch: true, style: '' },
					{ id: 'modalidade',                    name: 'MODALIDADE', sort: true, fullSearch: true, style: '' },
					{ id: 'descricaoObjeto',               name: 'OBJETO',     sort: true, fullSearch: true, style: '' }
				],
				filtroModalidade: null,
				filtroObjeto: null,
				linhaSelecionada: null
			};
		},

		computed: {
			filterFields: {
				get() {
					return {
						modalidade: { op: '=', value: this.filtroModalidade },
						descricaoObjeto: { op: '*', value: this.filtroObjeto },
					};
				},
				set(value) {
					this.filtroModalidade = value.filtroModalidade && value.filtroModalidade.value;
					this.filtroObjeto = value.descricaoObjeto && value.descricaoObjeto.value;
				}
			}
		},

		methods: {
			rowClick(value) {
				this.linhaSelecionada = value;
			}
		}
	};
</script>


<style scoped>
	.painel-filtros {
		padding: 5px 10px 5px 10px;
		border: 1px solid #e7e7e7;
		border-radius: 4px;
		margin-bottom: 10px;
	}
</style>