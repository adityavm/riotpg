/*
 * filters component
 */

<filters>
	<div class="filters">
		<div each={filters} onclick="{parent.toggle}">{getLabel()} filter</div>
	</div>

	<script>
		var self = this,
				model = filters;

		self.filters = model.getFilters();

		toggle (event) {
			var f = event.item;
			model.toggleFilter(f);
		}

		model.on("filtertoggled", function(f){
			console.log(f.getLabel(), "toggled");
		})
	</script>
</filters>
