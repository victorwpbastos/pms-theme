<template>
	<div class="menu" :class="{ 'toggled': toggled }">
		<div class="handler" @click="toggled = !toggled">
			<span class="fa fa-bars"></span>
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
	.menu {
		padding: 0 15px;
		position: relative;
		min-width: 70px;

		&.toggled {
			width: 70px;

			a:not(.handle) {
				justify-content: center;

				.fa {
					font-size: 20px;
				}
			}
		}

		.handler {
			height: 70px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #ffffff;
			font-size: 18px;
			cursor: pointer;
		}

		a {
			display: flex;
			align-items: center;
			height: 50px;
			text-decoration: none;
			color: darken(#ffffff, 0.5);
			transition: all 300ms;
			padding: 15px 10px;
			position: relative;

			.fa {
				transition: font-size 300ms;
			}

			&:hover,
			&.active {
				color: lighten(#5bc0de, 10);
			}

			&.active:after {
				content: '';
				position: absolute;
				right: -15px;
				border: 8px solid transparent;
				border-right-color: #ffffff;
			}
		}
	}
</style>