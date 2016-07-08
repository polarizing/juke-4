juke.config(function ($stateProvider) {
  $stateProvider
  .state('newPlaylist', {
    url: '/playlists/new',
    templateUrl: '/js/playlist/templates/playlist.html',
 	controller: 'PlaylistCtrl'
  })
  .state('singlePlaylist', {
  	url: '/playlists/:playlistId',
  	templateUrl: '/js/playlist/templates/singlePlaylist.html',
  	controller: 'SinglePlaylistCtrl'
  })
  ;
});
