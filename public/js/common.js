

// jquery - bootstrap 風格開關 - active
// use data-toggle="XXX" to toggle closest "active" class of data-role="XXX"
$('body').on('click', '[data-toggle]', e => { $(e.currentTarget).closest(`[data-role="${$(e.currentTarget).attr('data-toggle')}"]`).toggleClass('active'); })
// jquery - bootstrap 風格 remove
// use data-remove="XXX" to remove closest data-role="XXX"
$('body').on('click', '[data-remove]', e => { $(e.currentTarget).closest(`[data-role="${$(e.currentTarget).attr('data-remove')}"]`).remove(); })

