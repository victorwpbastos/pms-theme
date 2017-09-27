<template>
	<div>
		<div class="box">
			<h3 class="thin" style="margin-bottom:15px;">Lorem Ipsum</h3>

			<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et voluptas, similique fugit nemo quaerat cum, dolore dignissimos repudiandae rem non neque veniam eveniet odit aut natus ullam amet officia eaque.</div>
			<div>Quos asperiores sint magnam itaque, vero officiis quam, voluptas sunt quisquam quis labore fugiat. Consequuntur aliquam cupiditate aperiam blanditiis pariatur labore aut rem rerum. Reprehenderit voluptas nesciunt provident, harum vero!</div>

			<div class="text-right">

				<v-confirm-button class="btn-info" message="Deseja mesmo?">Salvar</v-confirm-button>
			</div>

			<table class="table">
				<thead>
					<tr>
						<th>nome</th>
						<th>email</th>
						<th>telefone</th>
						<th width="1"></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Nome Sobrenome 1</td>
						<td>email-1@email.com</td>
						<td>(15) 9999-9991</td>
						<td class="text-right" style="white-space:nowrap;">
							<!-- <a href="">Editar</a> -->
							<a href="">Editar</a>
							<v-confirm-button class="btn-link" style="padding:0;border:none;margin:0;">Remover</v-confirm-button>
						</td>
					</tr>
					<tr>
						<td>Nome Sobrenome 2</td>
						<td>email-2@email.com</td>
						<td>(15) 9999-9992</td>
						<td class="text-right" style="white-space:nowrap;">
							<!-- <a href="">Editar</a> -->
							<a href="">Editar</a>
							<v-confirm-button class="btn-link" style="padding:0;border:none;margin:0;">Remover</v-confirm-button>
						</td>
					</tr>
					<tr>
						<td>Nome Sobrenome 3</td>
						<td>email-3@email.com</td>
						<td>(15) 9999-9993</td>
						<td class="text-right" style="white-space:nowrap;">
							<!-- <a href="">Editar</a> -->
							<a href="">Editar</a>
							<v-confirm-button class="btn-link" style="padding:0;border:none;margin:0;">Remover</v-confirm-button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import VConfirmButton from 'components/confirm-button';

	export default {
		components: { VConfirmButton }
	};
</script>