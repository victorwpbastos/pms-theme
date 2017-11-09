<template>
	<div style="display:flex;align-items:center;">
		<select class="form-control paginator-items-per-page" v-model="items_per_page" @change="paginate(1)">
			<option value="10">10 registros por página</option>
			<option value="25">25 registros por página</option>
			<option value="50">50 registros por página</option>
			<option value="100">100 registros por página</option>
		</select>
		
		<slot></slot>

		<div class="input-group paginator-pager">
			<span class="input-group-btn">
				<button type="button" class="btn btn-default" @click="paginate(page - 1)" :disabled="parseInt(page, 10) === 1">
					<span class="fa fa-angle-left"></span>
				</button>
			</span>
			<select class="form-control" v-model="currentPage" @change="paginate($event.target.value)" :disabled="pages === 1">
				<option v-for="p in pages" :key="p" :value="p">Página {{ p }} de {{ pages }}</option>
			</select>
			<span class="input-group-btn">
				<button type="button" class="btn btn-default" @click="paginate(page + 1)" :disabled="parseInt(page, 10) === pages">
					<span class="fa fa-angle-right"></span>
				</button>
			</span>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			pageCount: { default: 1 }
		},

		data() {
			return {
				items_per_page: ''
			};
		},

		computed: {
			currentPage: {
				get() {
					return parseInt(this.$route.query.page, 10) || 1;
				},

				set() {}
			},

			pages() {
				return this.pageCount > 0 ? this.pageCount : 1;
			}
		},

		watch: {
			'$route.query': {
				handler() {
					let query = this.$route.query;

					this.page = parseInt(query.page, 10) || 1;
					this.items_per_page = parseInt(query.items_per_page, 10) || 10;
				},

				immediate: true
			}
		},

		methods: {
			paginate(page) {
				let query = Object.assign({}, this.$route.query, { page, items_per_page: this.items_per_page });

				if (parseInt(query.page, 10) === 1) {
					delete query.page;
				}

				if (parseInt(query.items_per_page, 10) === 10) {
					delete query.items_per_page;
				}

				this.$emit('paginate', query);

				this.$router.push({ query });
			}
		}
	};
</script>

<style scoped>
	select, .input-group {
		text-align-last: center;
		width: 200px;
	}
</style>