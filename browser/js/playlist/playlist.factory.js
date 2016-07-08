juke.factory('PlaylistFactory', function ($http) {

	var cachedPlaylists = [];

	var PlaylistFactory = {};

	PlaylistFactory.fetchAll = function() {
		return $http.get('/api/playlists')
				.then (function (response) {
					angular.copy(response.data, cachedPlaylists);
					return cachedPlaylists;
				})
	}

	PlaylistFactory.fetchById = function (id) {
		return $http.get('/api/playlists/' + id)
				    .then (function (response) {
				    	return response.data;
				    })
	}

	PlaylistFactory.create = function (data) {
		return $http.post('/api/playlists', data)
				.then (function (response) {
					var playlist = response.data;
					cachedPlaylists.push(playlist);
					return playlist;
				})
	}

	PlaylistFactory.addSong = function (playlistId, song) {
		return $http.post('/api/playlists/' + playlistId + '/songs', song)
				.then (function (response) {
					var playlist = response.data;
					return playlist;
				})
		// add song to Db through api
	}
	// var y;

	// var x = create(data)

	// x.then(function (resolvedPromise) {
	// 	y = resolvedPromise;
	// })

	return PlaylistFactory;
})