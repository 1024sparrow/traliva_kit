$Strip.prototype.$__updateSizes = function(){
	var $totalForParts = (this.$__orient === #e#$TralivaKit__Strip__orient:h##) ? this.$__w : this.$__h;
	if ($totalForParts < 0)
		return;
	var $totalParts = 0;
	for (var $0 = 0 ; $0 < this.$__items.length ; $0++){
        if (!this.$__items[$0].$isVisible())
            continue;
		if (this.$__sizes[$0].$unit == 'px'){
			$totalForParts -= this.$__sizes[$0].$value;
		}
		else if (this.$__sizes[$0].$unit == 'part'){
			$totalParts += this.$__sizes[$0].$value;
		}
	}
	for (var $0 = 0 ; $0 < this.$__items.length ; $0++){
        if (!this.$__items[$0].$isVisible())
            continue;
		var $tmpSize = undefined;
		if (this.$__sizes[$0].$unit == 'px'){
			$tmpSize = this.$__sizes[$0].$value;
		}
		else if (this.$__sizes[$0].$unit == 'part'){
			$tmpSize = this.$__sizes[$0].$value * $totalForParts / $totalParts;
		}
		if (!$tmpSize){
			console.log('epic fail');
			continue;
		}

		var $1 = this.$__items[$0];
		if (this.$__orient == #e#$TralivaKit__Strip__orient:h##)
			$1.$resize($tmpSize,this.$__h);
		else
			$1.$resize(this.$__w, $tmpSize);
	}
};
