<template>
	<div class="input-group">
		<span class="input-group-btn">
			<button type="button" class="btn btn-default" @click="paginate(page - 1)" :disabled="parseInt(page, 10) === 1">
				<span class="fa fa-angle-left"></span>
			</button>
		</span>
		<select class="form-control" v-model="page" style="text-align-last:center;" @change="paginate($event.target.value)" :disabled="pages === 1">
			<option v-for="p in pages" :value="p">Página {{ p }} de {{ pages }}</option>
		</select>
		<span class="input-group-btn">
			<button type="button" class="btn btn-default" @click="paginate(page + 1)" :disabled="parseInt(page, 10) === pages">
				<span class="fa fa-angle-right"></span>
			</button>
		</span>
	</div>
</template>

<script>
	export default {
		props: {
			currentPage: { default: 1 },
			pageCount: { default: 0 }
		},

		data() {
			return {
				page: this.currentPage
			};
		},

		computed: {
			pages() {
				return this.pageCount > 0 ? this.pageCount : 1;
			}
		},

		watch: {
			$route() {
				let query = this.$route.query;

				this.page = query.page || 1;
			}
		},

		created() {
			if (this.page > 1) {
				this.paginate(this.page);
			}
		},

		methods: {
			paginate(page) {
				let query = Object.assign({}, this.$route.query, { page });

				if (parseInt(page, 10) === 1) {
					delete query.page;
				}

				this.$router.push({ query });
			}
		}
	};
</script>