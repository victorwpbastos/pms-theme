<template>
	<div>
		<div class="box">
			<h3 class="thin" style="margin-bottom:15px;">Lorem Ipsum</h3>

			<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et voluptas, similique fugit nemo quaerat cum, dolore dignissimos repudiandae rem non neque veniam eveniet odit aut natus ullam amet officia eaque.</div>
			<div>Quos asperiores sint magnam itaque, vero officiis quam, voluptas sunt quisquam quis labore fugiat. Consequuntur aliquam cupiditate aperiam blanditiis pariatur labore aut rem rerum. Reprehenderit voluptas nesciunt provident, harum vero!</div>

			<div class="text-right">

				<v-confirm-button message="Deseja">Salvar</v-confirm-button>
			</div>

			<div class="clearfix"></div>
		</div>
	</div>
</template>

<script>
	import VConfirmButton from 'components/confirm-button';

	export default {
		components: { VConfirmButton }
	};
</script>