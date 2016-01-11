<text>
	<div class="text">{text}</div>

	<script>
		var self = this,
				model = text;

		self.text = "";

		filters.on("filtertoggled", function() {
			var actives = filters.getActiveFilters(),
					text = "";

			self.update({text:""}); // reset

			r.forEach(actives, (i,v)=>{
				var idx = v.getKey();
				self.update({text: text+=model.getText(idx)}); // update
			});
		})
	</script>
</text>
