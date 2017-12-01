<template>
	<div class="box">
		<!-- DATATABLE PADRÃO -->
		<h3 class="thin" style="margin-bottom: 15px;">DataTable Padrão</h3>

		<v-data-table :url="url" :fields="fields"></v-data-table>

		<!-- DATATABLE PERSONALIZADA -->

		<h3 class="thin" style="margin-top: 30px; margin-bottom: 15px;">DataTable Personalizada</h3>

		<p><strong>Parâmetros</strong>: {{ parameters }}</p>
		<p><strong>Item Selecionado:</strong> {{currentItem}}</p>

		<v-data-table
			:url="url"
			:fields="fields"
			:urlAccess="false"
			:parameters.sync="parameters"
			:filterFields="filterFields"
		>
			<template slot="filters">
				<div style="padding: 5px; border: 1px solid #ddd;">
					<select class="form-control" v-model="filtroModalidade">
						<option :value="null">-- selecione uma modalidade --</option>
						<option value="Concorrência">Concorrência</option>
						<option value="Convite">Convite</option>
						<option value="Pregão Presencial">Pregão Presencial</option>
					</select>
				</div>
			</template>

			<template slot="table" scope="{fields, items}">
				<div style="margin-bottom: 10px;">
					<div class="row" v-for="item in items" :key="item.id" @click="() => currentItem = item">
						<div class="col-md-12">
							<div class="card">
								<div><strong>Processo:</strong> {{item.codigoProcesso}}</div>
								<div><strong>Abertura:</strong> {{item.dataAbertura}}</div>
								<div><strong>Status:</strong> {{item.statusPublicacaoProcesso.nome}}</div>
								<div><strong>Modalidade:</strong> {{item.modalidade}}</div>
								<div><strong>Descrição:</strong> {{item.descricaoObjeto}}</div>
							</div>
						</div>
					</div>
				</div>
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
					{ id: 'codigoProcesso',                name: 'PROCESSO',   sort: true, fullSearch: true, style: '' },
					{ id: 'dataAbertura',                  name: 'ABERTURA',   sort: true, fullSearch: true, style: '' },
					{ id: 'statusPublicacaoProcesso.nome', name: 'STATUS',     sort: true, fullSearch: true, style: '' },
					{ id: 'modalidade',                    name: 'MODALIDADE', sort: true, fullSearch: true, style: '' },
					{ id: 'descricaoObjeto',               name: 'OBJETO',     sort: true, fullSearch: true, style: '' }
				],
				parameters: null,
				currentItem: null,
				filtroModalidade: null
			};
		},

		computed: {
			filterFields: {
				get() {
					return {
						modalidade: { op: '=', value: this.filtroModalidade },
					};
				},
				set(value) {
					this.filtroModalidade = value.filtroModalidade && value.filtroModalidade.value;
				}
			}
		},
	};
</script>

<style scoped>
	.card {
		padding: 10px;
		border: 1px solid #ddd;
	}

	.card:hover {
		background-color: #ffffde;
	}
</style>