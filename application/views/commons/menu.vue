<template>
	<div class="box">
		<router-link to="/" exact>
			<span class="fa fa-home m-right-10"></span> Home
		</router-link>
		<router-link to="/menu-item-1" exact>
			<span class="fa fa-angle-right m-right-10"></span> Menu Item 1
		</router-link>
		<router-link to="/menu-item-2" exact>
			<span class="fa fa-angle-right m-right-10"></span> Menu Item 2
		</router-link>
		<router-link to="/menu-item-3" exact>
			<span class="fa fa-angle-right m-right-10"></span> Menu Item 3
		</router-link>
		<router-link to="/menu-item-4" exact>
			<span class="fa fa-angle-right m-right-10"></span> Menu Item 4
		</router-link>
		<router-link to="/menu-item-5" exact>
			<span class="fa fa-angle-right m-right-10"></span> Menu Item 5
		</router-link>
	</div>
</template>

<script>
	export default {

	};
</script>

<style lang="scss" scoped>
	.box {
		padding: 0;
	}

	a {
		display: flex;
		align-items: center;
		border-left: solid 2px transparent;
		text-decoration: none;
		color: #777777;
		font-weight: 100;
		transition: all 0.5s;
		padding: 15px;

		&:hover,
		&.active {
			border-left-color: #5bc0de;
			color: #5bc0de;
		}
	}
</style>