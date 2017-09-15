let _fetch = window.fetch;

window.fetch = (url, options) => {
	return new Promise((resolve, reject) => {
		let p = _fetch(url, options);

		document.dispatchEvent(new CustomEvent('fetchStart', { detail: p }));

		p.then(response => {
			if (response.ok) {
				return response;
			} else {
				let error = new Error(response.statusText);

				error.response = response;

				throw error;
			}
		}).catch(error => {
			document.dispatchEvent(new CustomEvent('fetchError', { detail: error.response }));

			reject(error);
		}).then(response => {
			document.dispatchEvent(new CustomEvent('fetchEnd', { detail: response }));

			resolve(response);
		});
	});
};

// window.fetch = function() {

//     // Create hooks
//     var fetchStart = new Event( 'fetchStart', { 'view': document, 'bubbles': true, 'cancelable': false } );
//     var fetchEnd = new Event( 'fetchEnd', { 'view': document, 'bubbles': true, 'cancelable': false } );

//     // Pass the supplied arguments to the real fetch function
//     var fetchCall = _oldFetch.apply(this, arguments);

//     // Trigger the fetchStart event
//     document.dispatchEvent(fetchStart);

//     fetchCall.then(function(){
//         // Trigger the fetchEnd event
//         document.dispatchEvent(fetchEnd);
//     }).catch(function(){
//         // Trigger the fetchEnd event
//         document.dispatchEvent(fetchEnd);
//     });

//     return fetchCall;
// };

// document.addEventListener('fetchStart', function() {
//     console.log("Show spinner");
// });

// document.addEventListener('fetchEnd', function() {
//     console.log("Hide spinner");
// });