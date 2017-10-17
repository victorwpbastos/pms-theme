<template>
	<div>
		<h3 class="thin" style="margin-bottom:15px;">Lorem Ipsum</h3>

		<v-group label="Nome" id="chunda" :validation="model.$v.usuario">
			<v-input v-model="model.usuario"></v-input>
		</v-group>

		{{ cpf }}
		<v-group label="CPF (emitMasked = true)">
			<v-masked-input
			mask="\/\/\/ ### ### ##"
			v-model="cpf"
			>
			></v-masked-input>
		</v-group>

		{{ cpf2 }}
		<v-group label="CPF2 (emitMasked = false)">
			<v-masked-input
			:mask="[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]"
			v-model="cpf2"
			:emit-masked="false"
			>
			></v-masked-input>
		</v-group>

		{{ nome }}
		<v-group label="Nome (emitMasked = true)">
			<v-masked-input
			mask="***********************************"
			v-model="nome"
			>
			></v-masked-input>
		</v-group>

		<div class="text-right" style="margin-bottom:15px;">
			<v-confirm-button class="btn-info" position="left" message="<strong>Confirma?</strong>">Salvar</v-confirm-button>
		</div>

		<table class="table">
			<thead>
				<tr>
					<th>nome</th>
					<th>email</th>
					<th>telefone</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Nome Sobrenome 1</td>
					<td>email-1@email.com</td>
					<td>(15) 99999-9991</td>
				</tr>
				<tr>
					<td>Nome Sobrenome 2</td>
					<td>email-2@email.com</td>
					<td>(15) 99999-9992</td>
				</tr>
				<tr>
					<td>Nome Sobrenome 3</td>
					<td>email-3@email.com</td>
					<td>(15) 99999-9993</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td colspan="4">
						<v-paginator class="pull-right" :page-count="200"></v-paginator>
					</td>
				</tr>
			</tfoot>
		</table>
	</div>
</template>

<script>
	import VConfirmButton from 'components/confirm-button';
	import VPaginator from 'components/paginator';
	import PermisysModel from 'models/permisys';

	export default {
		components: { VConfirmButton, VPaginator },

		data() {
			return {
				model: new PermisysModel(),

				cpf: '32106338864',
				cpf2: '32106338864',
				nome: 'victor_bastos'
			};
		}
	};
</script>