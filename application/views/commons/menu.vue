<template>
	<ul class="menu">
		<li>
			<router-link to="/menu-item-1">Menu Item 1</router-link>
		</li>
		<li>
			<router-link to="/menu-item-2">Menu Item 2</router-link>
		</li>
		<li>
			<router-link to="/menu-item-3">Menu Item 3</router-link>
		</li>
		<li>
			<router-link to="/menu-item-4">Menu Item 4</router-link>
		</li>
		<li>
			<router-link to="/menu-item-5">Menu Item 5</router-link>
		</li>
	</ul>
</template>

<style scoped>
	.menu {
		display: flex;
		list-style: none;
		margin: 0 15px;
		padding: 0;
	}

	.menu li {
		display: flex;
		margin-right: 20px;
		height: 80px;
	}

	.menu li:last-of-type {
		margin-right: 0;
	}

	.menu li a {
		display: flex;
		align-items: center;
		border-top: solid 2px transparent;
		border-bottom: solid 2px transparent;
		text-decoration: none;
		color: #777777;
		font-size: 16px;
		font-weight: 100;
		transition: all 0.5s;
	}

	.menu li a:hover,
	.menu li a.active {
		border-bottom-color: #5bc0de;
		color: #5bc0de;
	}
</style>