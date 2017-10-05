<template>
	<div class="box" :class="{ 'toggled': toggled }">
		<div class="header">
			<a href="#" class="handle" @click.prevent="toggled = !toggled">
				<span :class="['fa', toggled ? 'fa-angle-right' : 'fa-angle-left']"></span>
			</a>
		</div>

		<router-link to="/" exact>
			<span class="fa fa-home"></span>
			<span v-if="!toggled" class="m-left-10">Home</span>
		</router-link>

		<router-link to="/usuarios" exact>
			<span class="fa fa-users"></span>
			<span v-if="!toggled" class="m-left-10">Usuários</span>
		</router-link>

		<router-link to="/documentos" exact>
			<span class="fa fa-files-o"></span>
			<span v-if="!toggled" class="m-left-10">Documentos</span>
		</router-link>

		<router-link to="/items" exact>
			<span class="fa fa-table"></span>
			<span v-if="!toggled" class="m-left-10">Items</span>
		</router-link>

		<router-link to="/configuracoes" exact>
			<span class="fa fa-cog"></span>
			<span v-if="!toggled" class="m-left-10">Configurações</span>
		</router-link>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				toggled: false
			};
		},

		watch: {
			toggled() {
				localStorage.setItem('app-menu-toggled', this.toggled);
			}
		},

		created() {
			let value = localStorage.getItem('app-menu-toggled');

			if (value) {
				this.toggled = JSON.parse(value);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.box {
		padding: 0;
		width: 200px;
		position: relative;
		transition: all 300ms;

		&.toggled {
			width: 60px;

			a:not(.handle) {
				justify-content: center;

				.fa {
					font-size: 18px;
				}
			}
		}

		.header {
			display: flex;
			justify-content: flex-end;

			.handle {
				border-left: none;
				padding: 10px;
				height: auto;
			}
		}

		a {
			display: flex;
			align-items: center;
			height: 50px;
			border-left: solid 2px transparent;
			text-decoration: none;
			color: #777777;
			opacity: 0.8;
			transition: all 300ms;
			padding: 15px;

			.fa {
				transition: font-size 300ms;
				opacity: 0.8;
			}

			&:hover,
			&.active {
				border-left-color: #5bc0de;
				color: #5bc0de;
			}
		}
	}
</style>