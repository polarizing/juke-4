juke.controller('PlaylistCtrl', function ($scope, $log, PlaylistFactory, $state) {

	$scope.playlist = {};
	$scope.playlists;

	PlaylistFactory.fetchAll()
	   .then(function (playlists) {
	   		$scope.playlists = playlists;
	   })
	   .catch($log)

	$scope.submit = function() {
		var newPlaylistDBEntry = PlaylistFactory.create($scope.playlist);
		newPlaylistDBEntry.then(function(response) {
			return response.id;
		})
		.then(function (playlistId) {
			resetForm();
			$state.go('singlePlaylist', {playlistId: playlistId})
		})
	}

	function resetForm () {
		$scope.playlist = {};
		$scope.playlistForm.$setPristine();
	}
});

juke.controller('SinglePlaylistCtrl', function ($scope, $log, $stateParams, PlayerFactory, PlaylistFactory, SongFactory) {

	$scope.playlist = {};
	$scope.songs = {};
	PlaylistFactory.fetchById($stateParams.playlistId)
	               .then(function (playlist) {
	               	    $scope.playlist = playlist;
	               	    var songs = playlist.songs.map(SongFactory.convert);
	               	    $scope.playlist.songs = songs;
	               	    console.log($scope.playlist);
	               })
	               .catch($log);
	SongFactory.fetchAllSongs()
		.then(function(songs) {
			$scope.songs = songs;
		})

	function resetForm () {
		$scope.song = "";
		$scope.addToPlaylistForm.$setPristine();
	}

	$scope.addSong = function(playlist, song) {
		var newPlaylistSongDBEntry = PlaylistFactory.addSong(playlist.id, song);
		newPlaylistSongDBEntry.then(function(song) {
			song = SongFactory.convert(song)
			$scope.playlist.songs.push(song);
			console.log('successfully added song to db!')
		})
		.catch($log);
		resetForm();
		console.log($scope.playlist);
	}

	  $scope.toggle = function (song) {
	    if (song !== PlayerFactory.getCurrentSong()) {
	      PlayerFactory.start(song, $scope.playlist.songs);
	    } else if ( PlayerFactory.isPlaying() ) {
	      PlayerFactory.pause();
	    } else {
	      PlayerFactory.resume();
	    }
	  };

})