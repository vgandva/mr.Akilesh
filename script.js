(function(){
    var script = {
 "defaultVRPointer": "laser",
 "horizontalAlign": "left",
 "paddingTop": 0,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "children": [
  "this.MainViewer",
  "this.IconButton_A2C29DAC_B267_2BB0_41D3_A08D4CDE88E2"
 ],
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_A2C29DAC_B267_2BB0_41D3_A08D4CDE88E2], 'cardboardAvailable')",
 "contentOpaque": false,
 "scrollBarMargin": 2,
 "scripts": {
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "registerKey": function(key, value){  window[key] = value; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getKey": function(key){  return window[key]; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "existsKey": function(key){  return key in window; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "unregisterKey": function(key){  delete window[key]; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } }
 },
 "downloadEnabled": false,
 "width": "100%",
 "layout": "absolute",
 "paddingBottom": 0,
 "verticalAlign": "top",
 "paddingRight": 0,
 "borderRadius": 0,
 "class": "Player",
 "paddingLeft": 0,
 "propagateClick": false,
 "scrollBarWidth": 10,
 "height": "100%",
 "minHeight": 20,
 "borderSize": 0,
 "definitions": [{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A5380597_AF18_F31C_41C3_5495F01B6318_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -103.57,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F55F1974_B265_7083_41D7_15FA097BE955"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_BEEF6186_B265_5870_41B2_01B52D376C47_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 29.03,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F11F2E8B_B265_7185_41E2_63AF54DE3D89"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "20",
 "id": "panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4",
 "thumbnailUrl": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF",
   "yaw": -92.63,
   "backwardYaw": 23.89,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF",
   "yaw": -92.63,
   "backwardYaw": 23.89,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD",
   "yaw": -2.99,
   "backwardYaw": -79.62,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_96C41FBD_B2BB_2FFD_41D9_D7A65FEFD28C",
  "this.overlay_95A60CED_B2AC_D19D_41D6_6958B7E23262",
  "this.overlay_94BD5977_B2AD_308E_41CC_61C90C69A5E2"
 ],
 "hfov": 360
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "19",
 "id": "panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423",
 "thumbnailUrl": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF",
   "yaw": -102.85,
   "backwardYaw": 23.89,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF",
   "yaw": -102.85,
   "backwardYaw": 23.89,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD",
   "yaw": 25.7,
   "backwardYaw": -79.62,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4"
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_90D14581_B2BD_7385_41E6_2B38A12C58D8",
  "this.overlay_97FD0820_B2BD_5083_418C_50F76BA97ACC"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -63.08,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F413EC4E_B265_709F_41DD_8115683BF63F"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_BFA221F6_B265_7B90_41CE_29AB30599647_camera"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "6",
 "id": "panorama_A5380597_AF18_F31C_41C3_5495F01B6318",
 "thumbnailUrl": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291",
   "yaw": 91.69,
   "backwardYaw": -74.62,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A5318996_AF18_D31C_4192_95A25E17DCE8",
   "yaw": -86.09,
   "backwardYaw": 94.32,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A6E59DA7_B27B_2BB0_41E0_E93C1D04D464",
  "this.overlay_AA8C9945_B3AD_28F0_41DE_31AECA1061EA"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -156.11,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F4BCDAE3_B265_7185_41CD_28BF2B36E9CB"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "3",
 "id": "panorama_A5009292_AF19_3114_41CA_7DA731CF7223",
 "thumbnailUrl": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB",
   "yaw": 134.67,
   "backwardYaw": -47.84,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_BD3640E2_B265_59B1_41DB_A6F87E03E13E"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -92.66,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F4245C30_B265_7083_41E0_FA501C02336C"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_camera",
 "displayOriginPosition": {
  "class": "RotationalCameraDisplayPosition",
  "stereographicFactor": 1,
  "yaw": 0,
  "hfov": 165,
  "pitch": -90
 },
 "displayMovements": [
  {
   "class": "TargetRotationalCameraDisplayMovement",
   "duration": 1000,
   "easing": "linear"
  },
  {
   "class": "TargetRotationalCameraDisplayMovement",
   "targetStereographicFactor": 0,
   "duration": 3000,
   "targetPitch": 0,
   "easing": "cubic_in_out"
  }
 ]
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "12",
 "id": "panorama_BEC36130_B265_3890_41D7_1592326A619A",
 "thumbnailUrl": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BEEF6186_B265_5870_41B2_01B52D376C47",
   "yaw": -111.57,
   "backwardYaw": 142.36,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4"
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A9C7B8F2_B3AB_6990_41E6_1438042D76F0",
  "this.overlay_A8225C30_B3AD_2890_41E1_EE77437A3E9A",
  "this.overlay_A8C253A4_B3AB_DFB0_41C6_9EA3485BE722"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 145.3,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_FBE13CA6_B265_718F_41B8_9CE9F073BDF4"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 87.79,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F5CF5828_B265_7084_41D0_4200AE9392A5"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_BEC36130_B265_3890_41D7_1592326A619A_camera"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "9",
 "id": "panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964",
 "thumbnailUrl": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A5318996_AF18_D31C_4192_95A25E17DCE8"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BFA221F6_B265_7B90_41CE_29AB30599647",
   "yaw": 71.92,
   "backwardYaw": -24.07,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291",
   "yaw": -111.1,
   "backwardYaw": 74.38,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A7E3BEF6_B267_2990_41DC_730D83E892B5",
  "this.overlay_A7BD9F1C_B265_2890_41D9_0949F5894363",
  "this.overlay_A8F63A6C_B3E5_28B0_41D2_34E22937525F",
  "this.overlay_A8C5FFA4_B3E5_E7B0_41AB_0CF52EA56CF4"
 ],
 "hfov": 360
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "8",
 "id": "panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291",
 "thumbnailUrl": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A5380597_AF18_F31C_41C3_5495F01B6318",
   "yaw": -74.62,
   "backwardYaw": 91.69,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF",
   "yaw": -107.08,
   "backwardYaw": -83.7,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E",
   "yaw": -143.15,
   "backwardYaw": 58.57,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964",
   "yaw": 74.38,
   "backwardYaw": -111.1,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A5318996_AF18_D31C_4192_95A25E17DCE8"
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A691FB0F_B27B_2870_41D5_05E06FFB8A8A",
  "this.overlay_A87F46E6_B3AD_39B0_41C5_BDA3D1E46F9A",
  "this.overlay_A9219B76_B3E7_E890_41CC_1FE869B1DA7F",
  "this.overlay_A9744D27_B3E7_68B0_41E4_101FF9800FA8",
  "this.overlay_90798675_B2BF_508D_41B3_877554ED2CFE"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 95.54,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F4464BEC_B265_7782_41E6_737606675A8D"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 16.13,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F59338CF_B265_719D_41C3_A4B18874FE18"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -45.33,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F10ACEA7_B265_718D_41E6_43032EC32515"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 81.6,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_FBCF1CC3_B265_7185_41DB_4584FBEAA589"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -146.61,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F53549DA_B265_7387_4177_24B218E3F9F4"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "4",
 "id": "panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB",
 "thumbnailUrl": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A5009292_AF19_3114_41CA_7DA731CF7223",
   "yaw": -47.84,
   "backwardYaw": 134.67,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A5318996_AF18_D31C_4192_95A25E17DCE8",
   "yaw": 85.56,
   "backwardYaw": -88.26,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A22CB4F7_B265_3990_41DA_C996C333DF6D",
  "this.overlay_A3D4F3FA_B264_FF90_41E4_D51C60EC09B4"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -167.34,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F0EE6EFA_B265_7187_41B2_A1328AACB38A"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -154.3,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F4679BAA_B265_7787_41E5_981736B062DC"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 91.74,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F100BEB5_B265_718D_41CF_3D3DA98C4EF4"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -73.51,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F52349F8_B265_7383_41DC_2E162BCB27C0"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 139.95,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F13FAE32_B265_7087_41C3_A2CA8D35F4A8"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 132.16,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F5DAE7E6_B265_7F8F_41E4_AB77B1E873AD"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "17",
 "id": "panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213",
 "thumbnailUrl": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE",
   "yaw": -85.49,
   "backwardYaw": 87.34,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F"
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_9319E07B_B2A5_D085_41D3_FF1291209088",
  "this.overlay_9209BD6E_B2AB_509E_41E2_4F3DEDFE8F58"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 36.85,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F5B4886D_B265_709D_41CD_33B5C70855E3"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 72.92,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F48A0B44_B265_7083_41E3_F7A78C24F197"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 100.38,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F0F2FEDF_B265_71BE_41B1_F10D13E27D11"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "16",
 "id": "panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE",
 "thumbnailUrl": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F",
   "yaw": -92.21,
   "backwardYaw": 12.66,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213",
   "yaw": 87.34,
   "backwardYaw": -85.49,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_ACC382FB_B267_D185_41DB_C8F26562B108",
  "this.overlay_926C832E_B25F_709F_41E4_8822E32355F3"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 87.37,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F4683B87_B265_778D_41E2_0C1E2AB6F29A"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "33",
 "id": "panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94",
 "thumbnailUrl": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0",
   "yaw": -163.87,
   "backwardYaw": -40.05,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF",
   "yaw": 76.43,
   "backwardYaw": -100.04,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_8F5BE102_B25C_D087_41E1_272965D1951A",
  "this.overlay_8F2FB763_B25D_3085_41AA_C6AB60FF65D4"
 ],
 "hfov": 360
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "24",
 "id": "panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0",
 "thumbnailUrl": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D",
   "yaw": -89.61,
   "backwardYaw": 70.8,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D",
   "yaw": 85.14,
   "backwardYaw": 70.8,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94",
   "yaw": -40.05,
   "backwardYaw": -163.87,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_9C9BD868_B2ED_3083_41DD_A039D386F742",
  "this.overlay_9C2E7458_B2EB_D083_41D6_1C85E2F8C429",
  "this.overlay_83A055C1_B2E5_3385_41C6_76F605502214",
  "this.overlay_83CA2D5D_B2FF_50BD_41D1_8F927B5E4ECA",
  "this.overlay_82A4068E_B2EB_F19E_41CF_95C6127258C8"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -156.11,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F4AC0B01_B265_7085_41DA_BB3180CBA917"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -108.08,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_FBBD2CD2_B265_7187_41B6_AF3815A50688"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_camera"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "14",
 "id": "panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4",
 "thumbnailUrl": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F",
   "yaw": -87.27,
   "backwardYaw": -67.23,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F",
   "yaw": -87.27,
   "backwardYaw": -67.23,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_AE44E2FA_B3AD_5990_41E5_0D684CA004E9",
  "this.overlay_AC65D1B3_B26D_D385_41DA_5E51B21575DB"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 48.53,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F1158E9A_B265_7187_41A8_927C701EE09D"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_camera"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "25",
 "id": "panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246",
 "thumbnailUrl": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824",
   "yaw": -129,
   "backwardYaw": -150.97,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32",
   "yaw": 153.51,
   "backwardYaw": -131.47,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94"
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_80470012_B2E5_D087_41E1_95A7CABC4B39",
  "this.overlay_825421C0_B2E5_D383_41DC_AC1703879827",
  "this.overlay_81C77A31_B2DB_3085_41E4_9E72EA006CBB",
  "this.overlay_81679E79_B2DD_5085_41E2_BC8B6C553137"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 100.38,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F49C4B24_B265_7083_41E4_B2BBB015F15A"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 96.3,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F4E0DA7E_B265_717E_417C_2BF0035968F4"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "21",
 "id": "panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD",
 "thumbnailUrl": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423",
   "yaw": -79.62,
   "backwardYaw": 25.7,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5",
   "yaw": 107.04,
   "backwardYaw": -84.46,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5",
   "yaw": 107.04,
   "backwardYaw": -84.46,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4",
   "yaw": -79.62,
   "backwardYaw": -2.99,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_9B64482F_B2A5_F09E_41E5_99C39D53EAEE",
  "this.overlay_949357DC_B2A7_5F83_41DB_5F8C1A46820A"
 ],
 "hfov": 360
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "28",
 "id": "panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605",
 "thumbnailUrl": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BED482FE_B267_3990_41C2_70989461517C",
   "yaw": -117.88,
   "backwardYaw": 142.8,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_8BD0E9DF_B2BB_73BD_41D6_0DA5F49C582E",
  "this.overlay_84BA5DB5_B2BB_338D_41D6_DC3991335F0D"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 62.12,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F4019C71_B265_7085_41E3_8B6201F2D335"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 90.39,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F5028A3B_B265_7085_41E1_9A24F0DE4460"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -109.2,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F599F8AF_B265_719D_41B7_2C562D5F7BB3"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A5009292_AF19_3114_41CA_7DA731CF7223_camera"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "27",
 "id": "panorama_BED482FE_B267_3990_41C2_70989461517C",
 "thumbnailUrl": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32",
   "yaw": 73.41,
   "backwardYaw": 116.92,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605",
   "yaw": 142.8,
   "backwardYaw": -117.88,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_84A9E6FB_B2BD_7185_41CB_1BEC2618DBAB",
  "this.overlay_854F2AFD_B2BD_D182_41E4_47B35BA3A661"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 19.65,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F0F7EEEE_B265_719E_41E3_8267ED0252CD"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 94.51,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F0E3FF0B_B265_7085_41C2_AE668A2D07CC"
},
{
 "class": "PlayList",
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A52F3B91_AF19_7714_41DE_E532DB19D397",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "camera": "this.panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "camera": "this.panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A5009292_AF19_3114_41CA_7DA731CF7223",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "camera": "this.panorama_A5009292_AF19_3114_41CA_7DA731CF7223_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "camera": "this.panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A5318996_AF18_D31C_4192_95A25E17DCE8",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "camera": "this.panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A5380597_AF18_F31C_41C3_5495F01B6318",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "camera": "this.panorama_A5380597_AF18_F31C_41C3_5495F01B6318_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "camera": "this.panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "camera": "this.panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "camera": "this.panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_BFA221F6_B265_7B90_41CE_29AB30599647",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "camera": "this.panorama_BFA221F6_B265_7B90_41CE_29AB30599647_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_BEEF6186_B265_5870_41B2_01B52D376C47",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "camera": "this.panorama_BEEF6186_B265_5870_41B2_01B52D376C47_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_BEC36130_B265_3890_41D7_1592326A619A",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "camera": "this.panorama_BEC36130_B265_3890_41D7_1592326A619A_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "camera": "this.panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "camera": "this.panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "camera": "this.panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "camera": "this.panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "camera": "this.panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "camera": "this.panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "camera": "this.panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "camera": "this.panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "camera": "this.panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "camera": "this.panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "camera": "this.panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "camera": "this.panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 25)",
   "camera": "this.panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 25, 26)",
   "camera": "this.panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_BED482FE_B267_3990_41C2_70989461517C",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 26, 27)",
   "camera": "this.panorama_BED482FE_B267_3990_41C2_70989461517C_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 27, 28)",
   "camera": "this.panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 28, 29)",
   "camera": "this.panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 29, 30)",
   "camera": "this.panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 30, 31)",
   "camera": "this.panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 31, 32)",
   "camera": "this.panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 32, 33)",
   "camera": "this.panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_camera",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "media": "this.panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF",
   "end": "this.trigger('tourEnded')",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 33, 0)",
   "camera": "this.panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_camera",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "mainPlayList"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 77.15,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F47A6B68_B265_7083_41E6_162B33C1ABEE"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 112.77,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F54C5997_B265_738D_41E5_09A81753CF0F"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "34",
 "id": "panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF",
 "thumbnailUrl": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94",
   "yaw": -100.04,
   "backwardYaw": 76.43,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_8EF1DFF8_B25C_EF83_41DD_A952B273F86D",
  "this.overlay_8E638713_B25B_7086_41CE_5A42EB668026"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 95.54,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F457BBC8_B265_7783_41D1_9A1DAB1D2AA5"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -115.67,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_FBDFFCB5_B265_718D_41E0_66B8298CE537"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -72.96,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F129DE4F_B265_709D_41DD_FC415D6BD5BA"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "18",
 "id": "panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF",
 "thumbnailUrl": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291",
   "yaw": -83.7,
   "backwardYaw": -107.08,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423",
   "yaw": 23.89,
   "backwardYaw": -102.85,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4",
   "yaw": 23.89,
   "backwardYaw": -92.63,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_91C3B4E8_B2AF_5183_41D0_79F1DD1A530D",
  "this.overlay_912F5B86_B2AB_378F_41D6_A3B0E90CED57",
  "this.overlay_9033AA02_B2A5_5087_41E6_6AEEC4474FE2"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_BED482FE_B267_3990_41C2_70989461517C_camera"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "7",
 "id": "panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E",
 "thumbnailUrl": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291",
   "yaw": 58.57,
   "backwardYaw": -143.15,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_AAC1D198_B3E4_FB90_41BF_25EA69A7F2F0"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -85.68,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F5E1C7C3_B265_7F85_41B1_DAE8AF267FAA"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "10",
 "id": "panorama_BFA221F6_B265_7B90_41CE_29AB30599647",
 "thumbnailUrl": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BEC36130_B265_3890_41D7_1592326A619A"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F",
   "yaw": 161.5,
   "backwardYaw": 64.33,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BEEF6186_B265_5870_41B2_01B52D376C47",
   "yaw": 54.95,
   "backwardYaw": -98.4,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964",
   "yaw": -24.07,
   "backwardYaw": 71.92,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4"
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A59799C0_B265_6BF0_41E3_39A5FAAAD1DA",
  "this.overlay_A992D136_B3DD_3890_41CD_3D416A12445C",
  "this.overlay_A9C90898_B3DD_2990_41E5_09B93FDBE42B",
  "this.overlay_A832FD3B_B3DD_E890_41D0_D87E245953AE",
  "this.overlay_A93ACBB9_B3DD_2F90_41CF_F5869AC2CF2F"
 ],
 "hfov": 360
},
{
 "class": "PanoramaPlayer",
 "buttonCardboardView": "this.IconButton_A2C29DAC_B267_2BB0_41D3_A08D4CDE88E2",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "mouseControlMode": "drag_acceleration",
 "gyroscopeVerticalDraggingEnabled": true,
 "id": "MainViewerPanoramaPlayer",
 "touchControlMode": "drag_rotation"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 92.73,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F5D52805_B265_708D_41E6_77487B03653D"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -18.5,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F5BA5848_B265_7083_41D8_90A45FCA007E"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "15",
 "id": "panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E",
 "thumbnailUrl": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F"
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_ACD8102E_B26C_D09F_41E6_595754F09580"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 68.43,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F576A933_B265_7085_41D5_48D54A89207E"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.01,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F4359C0A_B265_7087_41D0_BCD13BB2E1FF"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -37.64,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_FBAD6CE1_B265_7185_41CF_5B1E2DBE49D1"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "23",
 "id": "panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D",
 "thumbnailUrl": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5",
   "yaw": -113.42,
   "backwardYaw": 44.99,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0",
   "yaw": 70.8,
   "backwardYaw": -89.61,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_9EE58BB6_B2E7_578F_41D5_19614D097C21",
  "this.overlay_9DA0B4E4_B2E4_D183_41DE_2D6FBABEC730",
  "this.overlay_9D2AEBA8_B2EC_D782_41CE_DC49E514A635",
  "this.overlay_83B471FC_B2EF_5383_41E0_68BC97337C77"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -125.05,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F57A5910_B265_7083_41E0_46D7A2FAF2B1"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "13",
 "id": "panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F",
 "thumbnailUrl": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4",
   "yaw": -67.23,
   "backwardYaw": -87.27,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE",
   "yaw": 12.66,
   "backwardYaw": -92.21,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BFA221F6_B265_7B90_41CE_29AB30599647",
   "yaw": 64.33,
   "backwardYaw": 161.5,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_AF62663A_B3A4_F890_41CA_F4D4F0F835E5",
  "this.overlay_AFE61522_B3A4_D8B0_41CA_6C36301BE9FD",
  "this.overlay_AE365849_B3AC_E8F0_41E1_371706283599"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -121.43,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F4DEFAA1_B265_7185_41AA_ED1D37B170CD"
},
{
 "class": "Panorama",
 "vfov": 180,
 "hfovMax": 130,
 "label": "29",
 "id": "panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE",
 "thumbnailUrl": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_t.jpg",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BEC4303B_B267_7890_4170_1E14F2E77FCE_t.jpg"
  }
 ],
 "pitch": 0,
 "hfovMin": "120%",
 "partial": false,
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -37.2,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F5644956_B265_708F_41CF_AA31F82263B5"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_camera"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -156.11,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F1059EC4_B265_7183_41B6_0971BA80AC77"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -94.44,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F1196E7C_B265_7083_41E6_0B474259C078"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -135.01,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F5135A1B_B265_7085_41DD_CD046343228C"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 155.93,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F0DB9F1A_B265_7087_41D1_671EC492DB73"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 112.77,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F54779B6_B265_738F_41D5_1032673B2363"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 68.9,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F4CE1ABF_B265_71FD_41D2_321165336C1F"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -26.49,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_FB9B2CEF_B265_719D_41B9_B5CFBE0F9A14"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -88.31,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F4F0BA5E_B265_70BF_41E3_F47CE8F9F5D1"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -106.59,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F13B9E20_B265_7083_41E4_32FD90CC6107"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "30",
 "id": "panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824",
 "thumbnailUrl": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246",
   "yaw": -150.97,
   "backwardYaw": -129,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277",
   "yaw": 33.39,
   "backwardYaw": -34.7,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_84A6FE9C_B2A5_5183_41C4_DE25B2FDCDB7",
  "this.overlay_8BF4F4FB_B2AB_7185_41E6_144D221797DD"
 ],
 "hfov": 360
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "22",
 "id": "panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5",
 "thumbnailUrl": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD",
   "yaw": -84.46,
   "backwardYaw": 107.04,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D",
   "yaw": 44.99,
   "backwardYaw": -113.42,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_9FDA79AE_B2E5_539F_41D4_43B53BDD983A",
  "this.overlay_9EBD2C57_B2E5_308D_41D1_9235F961E01A"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 79.96,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F1339E41_B265_7085_41E1_4C04DAC0C658"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -105.62,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F0D27F29_B265_7085_41D7_58E3BD6653D1"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 51,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_FBF1AC90_B265_7183_41E2_E75D59A1F5B9"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 105.38,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F5F737A5_B265_7F82_41CC_41DA74E6A0B4"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_camera"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "31",
 "id": "panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277",
 "thumbnailUrl": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824",
   "yaw": -34.7,
   "backwardYaw": 33.39,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F",
   "yaw": -160.35,
   "backwardYaw": 106.49,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0"
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_8B6F3521_B2AD_3082_41D1_88B1B47BF2B1",
  "this.overlay_8B3B7045_B2AF_508D_41E5_BDB169719BCD",
  "this.overlay_88BBE5D6_B2AB_738F_41E5_1B9B138ABBE1"
 ],
 "hfov": 360
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "11",
 "id": "panorama_BEEF6186_B265_5870_41B2_01B52D376C47",
 "thumbnailUrl": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BFA221F6_B265_7B90_41CE_29AB30599647",
   "yaw": -98.4,
   "backwardYaw": 54.95,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BFA221F6_B265_7B90_41CE_29AB30599647",
   "yaw": -98.4,
   "backwardYaw": 54.95,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BEC36130_B265_3890_41D7_1592326A619A",
   "yaw": 142.36,
   "backwardYaw": -111.57,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4"
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A852E32A_B3A7_38B0_41BC_FDF300516C3C",
  "this.overlay_A9EC93C4_B3A4_FFF0_41D4_3B46799CAD0C",
  "this.overlay_A914E475_B3A5_3890_4197_39EA450AD7E0",
  "this.overlay_8C2AE618_B26F_F083_41D6_59469DD8A48D"
 ],
 "hfov": 360
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "1",
 "id": "panorama_A52F3B91_AF19_7714_41DE_E532DB19D397",
 "thumbnailUrl": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C"
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_BC8C2A95_B25D_2990_41E5_D85F48EDA4A7"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 66.58,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F12E1E5E_B265_70BF_41E6_2C5843759E76"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "26",
 "id": "panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32",
 "thumbnailUrl": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246",
   "yaw": -131.47,
   "backwardYaw": 153.51,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_BED482FE_B267_3990_41C2_70989461517C",
   "yaw": 116.92,
   "backwardYaw": 73.41,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_86DE4D62_B2A5_3087_41D7_2125C73F7EFB",
  "this.overlay_86ADDBF1_B2BB_D782_41D9_68E70776E5E8"
 ],
 "hfov": 360
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "2",
 "id": "panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C",
 "thumbnailUrl": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A5009292_AF19_3114_41CA_7DA731CF7223"
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A2435470_B25D_3890_41D0_045F44D85F20"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_camera"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "5",
 "id": "panorama_A5318996_AF18_D31C_4192_95A25E17DCE8",
 "thumbnailUrl": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A5380597_AF18_F31C_41C3_5495F01B6318",
   "yaw": 94.32,
   "backwardYaw": -86.09,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB",
   "yaw": -88.26,
   "backwardYaw": 85.56,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_A0420343_B26B_78F0_41DF_5672C7BA0678",
  "this.overlay_A0B1FD58_B26D_2890_41E6_11C50BC220A2",
  "this.overlay_A10860CC_B27D_D9F0_41DF_D09EC81D32BB"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -156.11,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F0FC6ED2_B265_7186_41E4_D41753B437FC"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -109.2,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F5AED88B_B265_7185_41D5_453A8604A8CB"
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 93.91,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F1242E6D_B265_709D_41E2_AA77C9350E16"
},
{
 "class": "Panorama",
 "hfovMax": 130,
 "label": "32",
 "id": "panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F",
 "thumbnailUrl": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_t.jpg",
 "partial": false,
 "pitch": 0,
 "hfovMin": "120%",
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277",
   "yaw": 106.49,
   "backwardYaw": -160.35,
   "distance": 1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0"
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "rowCount": 6,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "tags": "ondemand",
      "height": 3072
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "rowCount": 3,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "rowCount": 2,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "class": "TiledImageResourceLevel",
      "width": 512,
      "rowCount": 1,
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_t.jpg"
  }
 ],
 "vfov": 180,
 "overlays": [
  "this.overlay_88B35DF0_B2A4_D383_41E5_84A546F33034",
  "this.overlay_8E9C684D_B2A5_D09D_41C2_885B14C0F4DE",
  "this.overlay_885E4380_B2A7_F783_41D0_3F3B50EB3DA6"
 ],
 "hfov": 360
},
{
 "class": "PanoramaCamera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -125.05,
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "id": "camera_F58EE8F3_B265_7186_41E1_94680D02D571"
},
{
 "toolTipShadowVerticalLength": 0,
 "playbackBarOpacity": 1,
 "id": "MainViewer",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "progressBarOpacity": 1,
 "vrPointerColor": "#FFFFFF",
 "width": "100%",
 "progressBorderSize": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderSize": 1,
 "toolTipShadowHorizontalLength": 0,
 "toolTipPaddingRight": 6,
 "paddingBottom": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "progressBorderRadius": 0,
 "toolTipPaddingTop": 4,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingLeft": 6,
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "playbackBarLeft": 0,
 "minHeight": 50,
 "progressBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "toolTipBorderRadius": 3,
 "playbackBarHeadHeight": 15,
 "progressBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarBottom": 5,
 "progressBarBorderColor": "#000000",
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "displayTooltipInTouchScreens": true,
 "borderSize": 0,
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "height": "100%",
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "minWidth": 100,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipBorderColor": "#767676",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeight": 10,
 "toolTipOpacity": 1,
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": "1.11vmin",
 "paddingTop": 0,
 "toolTipTextShadowColor": "#000000",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "shadow": false,
 "transitionMode": "blending",
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "toolTipShadowColor": "#333333",
 "transitionDuration": 500,
 "playbackBarHeadBorderRadius": 0,
 "paddingRight": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "class": "ViewerArea",
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "data": {
  "name": "Main Viewer"
 }
},
{
 "cursor": "hand",
 "paddingTop": 0,
 "id": "IconButton_A2C29DAC_B267_2BB0_41D3_A08D4CDE88E2",
 "left": "1.76%",
 "maxWidth": 56,
 "maxHeight": 55,
 "width": 56,
 "paddingBottom": 0,
 "iconURL": "skin/IconButton_A2C29DAC_B267_2BB0_41D3_A08D4CDE88E2.png",
 "verticalAlign": "middle",
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "height": 55,
 "class": "IconButton",
 "paddingLeft": 0,
 "propagateClick": false,
 "transparencyActive": false,
 "minWidth": 1,
 "borderRadius": 0,
 "mode": "push",
 "borderSize": 0,
 "horizontalAlign": "center",
 "bottom": "5.87%",
 "data": {
  "name": "IconButton11335"
 },
 "shadow": false
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF, this.camera_F4AC0B01_B265_7085_41DA_BB3180CBA917); this.mainPlayList.set('selectedIndex', 17); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E6D398A_B2A4_D387_41DC_C273614857F1",
   "yaw": -92.63,
   "pitch": -51.6,
   "distance": 100,
   "hfov": 10.66
  }
 ],
 "id": "overlay_96C41FBD_B2BB_2FFD_41D9_D7A65FEFD28C",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -92.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0_HS_0_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -51.6,
   "hfov": 10.66
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD, this.camera_F49C4B24_B265_7083_41E4_B2BBB015F15A); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E6D998A_B2A4_D387_41E4_434D2C1149BB",
   "yaw": -2.99,
   "pitch": -25.86,
   "distance": 100,
   "hfov": 15.44
  }
 ],
 "id": "overlay_95A60CED_B2AC_D19D_41D6_6958B7E23262",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0_HS_1_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -25.86,
   "hfov": 15.44
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 21); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E6C098B_B2A4_D386_41CC_219CC1ACEF39",
   "yaw": 1.82,
   "pitch": -12.8,
   "distance": 100,
   "hfov": 11.11
  }
 ],
 "id": "overlay_94BD5977_B2AD_308E_41CC_61C90C69A5E2",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 1.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0_HS_2_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -12.8,
   "hfov": 11.11
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF, this.camera_F0FC6ED2_B265_7186_41E4_D41753B437FC); this.mainPlayList.set('selectedIndex', 17); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E6E6989_B2A4_D385_41DF_BAEF19D4B4CB",
   "yaw": -102.85,
   "pitch": -59.15,
   "distance": 100,
   "hfov": 8.8
  }
 ],
 "id": "overlay_90D14581_B2BD_7385_41E6_2B38A12C58D8",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -102.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0_HS_0_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -59.15,
   "hfov": 8.8
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 20); this.mainPlayList.set('selectedIndex', 19)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E6ED98A_B2A4_D387_41D2_B4336B74B397",
   "yaw": 25.7,
   "pitch": -36.5,
   "distance": 100,
   "hfov": 13.79
  }
 ],
 "id": "overlay_97FD0820_B2BD_5083_418C_50F76BA97ACC",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 25.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0_HS_1_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -36.5,
   "hfov": 13.79
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A5318996_AF18_D31C_4192_95A25E17DCE8, this.camera_F5E1C7C3_B265_7F85_41B1_DAE8AF267FAA); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A8BBF153_B3A5_7890_4154_97F249683143",
   "yaw": -86.09,
   "pitch": 1,
   "distance": 100,
   "hfov": 22.65
  }
 ],
 "id": "overlay_A6E59DA7_B27B_2BB0_41E0_E93C1D04D464",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -86.09,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1,
   "hfov": 22.65
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291, this.camera_F5F737A5_B265_7F82_41CC_41DA74E6A0B4); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AA978ABC_B3AD_6991_41E4_C2BBF5261FCA",
   "yaw": 91.69,
   "pitch": -35.18,
   "distance": 100,
   "hfov": 15.55
  }
 ],
 "id": "overlay_AA8C9945_B3AD_28F0_41DE_31AECA1061EA",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 91.69,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0_HS_2_0_0_map.gif",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -35.18,
   "hfov": 15.55
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB, this.camera_F5DAE7E6_B265_7F8F_41E4_AB77B1E873AD); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A8B9E14E_B3A5_78F0_41AE_B2506AA79838",
   "yaw": 134.67,
   "pitch": -36.02,
   "distance": 100,
   "hfov": 18.27
  }
 ],
 "id": "overlay_BD3640E2_B265_59B1_41DB_A6F87E03E13E",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 134.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_1_HS_0_0_0_map.gif",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -36.02,
   "hfov": 18.27
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BEEF6186_B265_5870_41B2_01B52D376C47, this.camera_FBAD6CE1_B265_7185_41CF_5B1E2DBE49D1); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_916A45A1_B3A5_3BB0_41E5_E5EE01213A6D",
   "yaw": -111.57,
   "pitch": -36.09,
   "distance": 100,
   "hfov": 13.87
  }
 ],
 "id": "overlay_A9C7B8F2_B3AB_6990_41E6_1438042D76F0",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -111.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0_HS_0_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -36.09,
   "hfov": 13.87
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_916AC5A2_B3A5_3BB0_41B5_1A1FA8A1053E",
   "yaw": -162.64,
   "pitch": 1.12,
   "distance": 100,
   "hfov": 10.29
  }
 ],
 "id": "overlay_A8225C30_B3AD_2890_41E1_EE77437A3E9A",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -162.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 1.12,
   "hfov": 10.29
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_916B05A2_B3A5_3BB0_41E5_008A1F5C0099",
   "yaw": -143.39,
   "pitch": 4.44,
   "distance": 100,
   "hfov": 10.95
  }
 ],
 "id": "overlay_A8C253A4_B3AB_DFB0_41C6_9EA3485BE722",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -143.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 4.44,
   "hfov": 10.95
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A8BD1156_B3A5_7890_41DF_10D38DFC6240",
   "yaw": -128.98,
   "pitch": -12.46,
   "distance": 100,
   "hfov": 10.7
  }
 ],
 "id": "overlay_A7E3BEF6_B267_2990_41DC_730D83E892B5",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -128.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_1_HS_1_0_0_map.gif",
      "width": 57,
      "height": 16
     }
    ]
   },
   "pitch": -12.46,
   "hfov": 10.7
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A8BEF157_B3A5_7890_41A3_E1716F263F73",
   "yaw": -88.03,
   "pitch": 5.3,
   "distance": 100,
   "hfov": 10.25
  }
 ],
 "id": "overlay_A7BD9F1C_B265_2890_41D9_0949F5894363",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -88.03,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 5.3,
   "hfov": 10.25
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291, this.camera_F0D27F29_B265_7085_41D7_58E3BD6653D1); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AED5FE0F_B3E5_2870_41D3_7A4414A6870C",
   "yaw": -111.1,
   "pitch": -25.52,
   "distance": 100,
   "hfov": 12.62
  }
 ],
 "id": "overlay_A8F63A6C_B3E5_28B0_41D2_34E22937525F",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -111.1,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0_HS_4_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -25.52,
   "hfov": 12.62
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BFA221F6_B265_7B90_41CE_29AB30599647, this.camera_F0DB9F1A_B265_7087_41D1_671EC492DB73); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AED58E0F_B3E5_2870_41C5_26F3B61EE3F9",
   "yaw": 71.92,
   "pitch": -20.09,
   "distance": 100,
   "hfov": 17.96
  }
 ],
 "id": "overlay_A8C5FFA4_B3E5_E7B0_41AB_0CF52EA56CF4",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 71.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0_HS_5_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -20.09,
   "hfov": 17.96
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A8BC6155_B3A5_7890_41DD_9241AE01C5AA",
   "yaw": -78.23,
   "pitch": -5.89,
   "distance": 100,
   "hfov": 12.43
  }
 ],
 "id": "overlay_A691FB0F_B27B_2870_41D5_05E06FFB8A8A",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -78.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -5.89,
   "hfov": 12.43
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964, this.camera_F4CE1ABF_B265_71FD_41D2_321165336C1F); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AE225772_B3A5_D890_4180_66D49EAF943F",
   "yaw": 74.38,
   "pitch": -30.17,
   "distance": 100,
   "hfov": 11.38
  }
 ],
 "id": "overlay_A87F46E6_B3AD_39B0_41C5_BDA3D1E46F9A",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 74.38,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0_HS_5_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -30.17,
   "hfov": 11.38
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A5380597_AF18_F31C_41C3_5495F01B6318, this.camera_F4F0BA5E_B265_70BF_41E3_F47CE8F9F5D1); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AED71E0E_B3E5_2870_41E4_F33A8F2F093C",
   "yaw": -74.62,
   "pitch": -35.61,
   "distance": 100,
   "hfov": 9.36
  }
 ],
 "id": "overlay_A9219B76_B3E7_E890_41CC_1FE869B1DA7F",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -74.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0_HS_8_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -35.61,
   "hfov": 9.36
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E, this.camera_F4DEFAA1_B265_7185_41AA_ED1D37B170CD); this.mainPlayList.set('selectedIndex', 6)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AED4AE0E_B3E5_2870_41C4_B97F4CEDC65C",
   "yaw": -143.15,
   "pitch": -28.45,
   "distance": 100,
   "hfov": 8.19
  }
 ],
 "id": "overlay_A9744D27_B3E7_68B0_41E4_101FF9800FA8",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -143.15,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0_HS_9_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -28.45,
   "hfov": 8.19
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF, this.camera_F4E0DA7E_B265_717E_417C_2BF0035968F4); this.mainPlayList.set('selectedIndex', 17)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01b"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E70B970_B2A4_D083_41E1_0350E4348493",
   "yaw": -107.08,
   "pitch": -9.18,
   "distance": 100,
   "hfov": 10.63
  }
 ],
 "id": "overlay_90798675_B2BF_508D_41B3_877554ED2CFE",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -107.08,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0_HS_10_0_0_map.gif",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -9.18,
   "hfov": 10.63
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A5318996_AF18_D31C_4192_95A25E17DCE8, this.camera_F100BEB5_B265_718D_41CF_3D3DA98C4EF4); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 04a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A8B9414F_B3A5_78F0_41C0_E7494D7AFE1E",
   "yaw": 85.56,
   "pitch": -26.73,
   "distance": 100,
   "hfov": 16.41
  }
 ],
 "id": "overlay_A22CB4F7_B265_3990_41DA_C996C333DF6D",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 85.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_1_HS_0_0_0_map.gif",
      "width": 22,
      "height": 16
     }
    ]
   },
   "pitch": -26.73,
   "hfov": 16.41
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A5009292_AF19_3114_41CA_7DA731CF7223, this.camera_F10ACEA7_B265_718D_41E6_43032EC32515); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A8B9014F_B3A5_78F0_41CD_C64A6FDFE016",
   "yaw": -47.84,
   "pitch": -31.9,
   "distance": 100,
   "hfov": 20.05
  }
 ],
 "id": "overlay_A3D4F3FA_B264_FF90_41E4_D51C60EC09B4",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -47.84,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_1_HS_1_0_0_map.gif",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -31.9,
   "hfov": 20.05
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE, this.camera_F4245C30_B265_7083_41E0_FA501C02336C); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E687981_B2A4_D385_41C4_92A9F88043EF",
   "yaw": -85.49,
   "pitch": -32.57,
   "distance": 100,
   "hfov": 8.68
  }
 ],
 "id": "overlay_9319E07B_B2A5_D085_41D3_FF1291209088",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -85.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0_HS_0_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -32.57,
   "hfov": 8.68
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E68D987_B2A4_D38D_41E2_075BF70A05CE",
   "yaw": -76.98,
   "pitch": -3.48,
   "distance": 100,
   "hfov": 10.28
  }
 ],
 "id": "overlay_9209BD6E_B2AB_509E_41E2_4F3DEDFE8F58",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -76.98,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.48,
   "hfov": 10.28
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F, this.camera_F0EE6EFA_B265_7187_41B2_A1328AACB38A); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E69A981_B2A4_D385_41E4_441F73F9E690",
   "yaw": -92.21,
   "pitch": -4.92,
   "distance": 100,
   "hfov": 10.26
  }
 ],
 "id": "overlay_ACC382FB_B267_D185_41DB_C8F26562B108",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -92.21,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -4.92,
   "hfov": 10.26
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213, this.camera_F0E3FF0B_B265_7085_41C2_AE668A2D07CC); this.mainPlayList.set('selectedIndex', 16)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E680981_B2A4_D385_41D1_64C265B8FC50",
   "yaw": 87.34,
   "pitch": -29.43,
   "distance": 100,
   "hfov": 12.79
  }
 ],
 "id": "overlay_926C832E_B25F_709F_41E4_8822E32355F3",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 87.34,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0_HS_1_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -29.43,
   "hfov": 12.79
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0, this.camera_F13FAE32_B265_7087_41C3_A2CA8D35F4A8); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4231CAE_B264_D19F_41D8_6ED270E04576",
   "yaw": -163.87,
   "pitch": -7.94,
   "distance": 100,
   "hfov": 10.2
  }
 ],
 "id": "overlay_8F5BE102_B25C_D087_41E1_272965D1951A",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -163.87,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -7.94,
   "hfov": 10.2
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF, this.camera_F1339E41_B265_7085_41E1_4C04DAC0C658); this.mainPlayList.set('selectedIndex', 33)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F423BCAF_B264_D19D_41BB_F206502B9679",
   "yaw": 76.43,
   "pitch": -32.45,
   "distance": 100,
   "hfov": 14.48
  }
 ],
 "id": "overlay_8F2FB763_B25D_3085_41AA_C6AB60FF65D4",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 76.43,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0_HS_1_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -32.45,
   "hfov": 14.48
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D, this.camera_F5AED88B_B265_7185_41D5_453A8604A8CB); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4587C98_B264_D183_41E0_82775D5DBA95",
   "yaw": -89.61,
   "pitch": -37.05,
   "distance": 100,
   "hfov": 13.7
  }
 ],
 "id": "overlay_9C9BD868_B2ED_3083_41DD_A039D386F742",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -89.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0_HS_0_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -37.05,
   "hfov": 13.7
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94, this.camera_F59338CF_B265_719D_41C3_A4B18874FE18); this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F458FC99_B264_D185_41B5_E61F8F2A0519",
   "yaw": -40.05,
   "pitch": -3.76,
   "distance": 100,
   "hfov": 10.27
  }
 ],
 "id": "overlay_9C2E7458_B2EB_D083_41D6_1C85E2F8C429",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -40.05,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.76,
   "hfov": 10.27
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 22); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F45B7C99_B264_D185_41BF_E1CB5D22A82E",
   "yaw": 85.14,
   "pitch": 0.22,
   "distance": 100,
   "hfov": 10.3
  }
 ],
 "id": "overlay_83A055C1_B2E5_3385_41C6_76F605502214",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 85.14,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.22,
   "hfov": 10.3
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F45B8C9A_B264_D187_41E2_23920DB19D53",
   "yaw": 42.73,
   "pitch": -43.36,
   "distance": 100,
   "hfov": 12.48
  }
 ],
 "id": "overlay_83CA2D5D_B2FF_50BD_41D1_8F927B5E4ECA",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 42.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0_HS_3_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -43.36,
   "hfov": 12.48
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 29)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F45A0C9A_B264_D187_41C0_A911EA55CE8E",
   "yaw": 169.57,
   "pitch": -4.99,
   "distance": 100,
   "hfov": 10.26
  }
 ],
 "id": "overlay_82A4068E_B2EB_F19E_41CF_95C6127258C8",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 169.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -4.99,
   "hfov": 10.26
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F, this.camera_F54779B6_B265_738F_41D5_1032673B2363); this.mainPlayList.set('selectedIndex', 12); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E6A897F_B2A4_D37D_41DD_57D0569EB6FD",
   "yaw": -87.27,
   "pitch": 22.26,
   "distance": 100,
   "hfov": 9.53
  }
 ],
 "id": "overlay_AE44E2FA_B3AD_5990_41E5_0D684CA004E9",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -87.27,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 22.26,
   "hfov": 9.53
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 14)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E6AE980_B2A4_D383_41AA_D6C45CB88A80",
   "yaw": 88.16,
   "pitch": -29.15,
   "distance": 100,
   "hfov": 11.87
  }
 ],
 "id": "overlay_AC65D1B3_B26D_D385_41DA_5E51B21575DB",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 88.16,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0_HS_1_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -29.15,
   "hfov": 11.87
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32, this.camera_F1158E9A_B265_7187_41A8_927C701EE09D); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F45A8C9B_B264_D185_41AA_DB97939457F2",
   "yaw": 153.51,
   "pitch": -9.87,
   "distance": 100,
   "hfov": 10.14
  }
 ],
 "id": "overlay_80470012_B2E5_D087_41E1_95A7CABC4B39",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 153.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -9.87,
   "hfov": 10.14
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F45D0CA0_B264_D183_41D0_7FCE25042AED",
   "yaw": -41.7,
   "pitch": -1.56,
   "distance": 100,
   "hfov": 10.29
  }
 ],
 "id": "overlay_825421C0_B2E5_D383_41DC_AC1703879827",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -41.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.56,
   "hfov": 10.29
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824, this.camera_F11F2E8B_B265_7185_41E2_63AF54DE3D89); this.mainPlayList.set('selectedIndex', 29)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F45DACA1_B264_D185_41DB_2E75BE99F678",
   "yaw": -129,
   "pitch": -3.9,
   "distance": 100,
   "hfov": 10.27
  }
 ],
 "id": "overlay_81C77A31_B2DB_3085_41E4_9E72EA006CBB",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -129,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -3.9,
   "hfov": 10.27
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F45C2CA1_B264_D185_41DD_1BAB6CD868A1",
   "yaw": -70.32,
   "pitch": -24.9,
   "distance": 100,
   "hfov": 10.83
  }
 ],
 "id": "overlay_81679E79_B2DD_5085_41E2_BC8B6C553137",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -70.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0_HS_3_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -24.9,
   "hfov": 10.83
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4, this.camera_F4359C0A_B265_7087_41D0_BCD13BB2E1FF); this.mainPlayList.set('selectedIndex', 19); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E6C798B_B2A4_D386_41BD_EE29C821AEE1",
   "yaw": -79.62,
   "pitch": -62.03,
   "distance": 100,
   "hfov": 5.99
  }
 ],
 "id": "overlay_9B64482F_B2A5_F09E_41E5_99C39D53EAEE",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -79.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0_HS_0_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -62.03,
   "hfov": 5.99
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5, this.camera_F4464BEC_B265_7782_41E6_737606675A8D); this.mainPlayList.set('selectedIndex', 21); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E6CC98C_B2A4_D382_41E2_5104A5A0B7F9",
   "yaw": 107.04,
   "pitch": -33,
   "distance": 100,
   "hfov": 14.39
  }
 ],
 "id": "overlay_949357DC_B2A7_5F83_41DB_5F8C1A46820A",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 107.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0_HS_1_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -33,
   "hfov": 14.39
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BED482FE_B267_3990_41C2_70989461517C, this.camera_F5644956_B265_708F_41CF_AA31F82263B5); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F45E1CA3_B264_D185_41E6_3624AD518E8D",
   "yaw": -117.88,
   "pitch": -42.26,
   "distance": 100,
   "hfov": 12.7
  }
 ],
 "id": "overlay_8BD0E9DF_B2BB_73BD_41D6_0DA5F49C582E",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -117.88,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0_HS_0_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -42.26,
   "hfov": 12.7
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F45E8CA4_B264_D183_41DE_B7320A38C672",
   "yaw": -72.45,
   "pitch": 10.24,
   "distance": 100,
   "hfov": 10.13
  }
 ],
 "id": "overlay_84BA5DB5_B2BB_338D_41D6_DC3991335F0D",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -72.45,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 10.24,
   "hfov": 10.13
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32, this.camera_F413EC4E_B265_709F_41DD_8115683BF63F); this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F45F1CA2_B264_D187_41E0_17D13CE6B15D",
   "yaw": 73.41,
   "pitch": -48.54,
   "distance": 100,
   "hfov": 9
  }
 ],
 "id": "overlay_84A9E6FB_B2BD_7185_41CB_1BEC2618DBAB",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 73.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0_HS_0_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -48.54,
   "hfov": 9
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605, this.camera_F4019C71_B265_7085_41E3_8B6201F2D335); this.mainPlayList.set('selectedIndex', 27)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F45F8CA3_B264_D185_41C2_87E573F7D49A",
   "yaw": 142.8,
   "pitch": -44.8,
   "distance": 100,
   "hfov": 8.86
  }
 ],
 "id": "overlay_854F2AFD_B2BD_D182_41E4_47B35BA3A661",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 142.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0_HS_1_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -44.8,
   "hfov": 8.86
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94, this.camera_F55F1974_B265_7083_41D7_15FA097BE955); this.mainPlayList.set('selectedIndex', 32)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4220CAF_B264_D19D_41E3_343030B63977",
   "yaw": -100.04,
   "pitch": -34.85,
   "distance": 100,
   "hfov": 11.83
  }
 ],
 "id": "overlay_8EF1DFF8_B25C_EF83_41DD_A952B273F86D",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -100.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0_HS_0_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -34.85,
   "hfov": 11.83
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F422BCB0_B264_D183_41D3_A4E7EEE4F073",
   "yaw": -108.41,
   "pitch": 2.69,
   "distance": 100,
   "hfov": 10.28
  }
 ],
 "id": "overlay_8E638713_B25B_7086_41CE_5A42EB668026",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -108.41,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.69,
   "hfov": 10.28
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291, this.camera_F48A0B44_B265_7083_41E3_F7A78C24F197); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E6F3988_B2A4_D383_41D2_B21427D0AE01",
   "yaw": -83.7,
   "pitch": -41.1,
   "distance": 100,
   "hfov": 8.38
  }
 ],
 "id": "overlay_91C3B4E8_B2AF_5183_41D0_79F1DD1A530D",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -83.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0_HS_0_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -41.1,
   "hfov": 8.38
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E6F9988_B2A4_D383_41E5_0AE2A3C81908",
   "yaw": -84.39,
   "pitch": -23.04,
   "distance": 100,
   "hfov": 7.96
  }
 ],
 "id": "overlay_912F5B86_B2AB_378F_41D6_A3B0E90CED57",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -84.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0_HS_1_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -23.04,
   "hfov": 7.96
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4, this.camera_F4683B87_B265_778D_41E2_0C1E2AB6F29A); this.mainPlayList.set('selectedIndex', 19); this.mainPlayList.set('selectedIndex', 18)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E6FF988_B2A4_D383_41E4_9081002822D0",
   "yaw": 23.89,
   "pitch": -34.37,
   "distance": 100,
   "hfov": 11.67
  }
 ],
 "id": "overlay_9033AA02_B2A5_5087_41E6_6AEEC4474FE2",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 23.89,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0_HS_2_0_0_map.gif",
      "width": 36,
      "height": 16
     }
    ]
   },
   "pitch": -34.37,
   "hfov": 11.67
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291, this.camera_F5B4886D_B265_709D_41CD_33B5C70855E3); this.mainPlayList.set('selectedIndex', 7)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AED7FE0D_B3E5_2870_41E1_D0DC72A26482",
   "yaw": 58.57,
   "pitch": -22.36,
   "distance": 100,
   "hfov": 11.66
  }
 ],
 "id": "overlay_AAC1D198_B3E4_FB90_41BF_25EA69A7F2F0",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 58.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0_HS_1_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -22.36,
   "hfov": 11.66
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A8BE4159_B3A5_7890_41B9_D6A060599E68",
   "yaw": 165.59,
   "pitch": -2.69,
   "distance": 100,
   "hfov": 17.41
  }
 ],
 "id": "overlay_A59799C0_B265_6BF0_41E3_39A5FAAAD1DA",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 165.59,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_1_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -2.69,
   "hfov": 17.41
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BEEF6186_B265_5870_41B2_01B52D376C47, this.camera_FBCF1CC3_B265_7185_41DB_4584FBEAA589); this.mainPlayList.set('selectedIndex', 10)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9168359C_B3A5_3B90_41A0_A3ED2F57FE5D",
   "yaw": 54.95,
   "pitch": -47.86,
   "distance": 100,
   "hfov": 9.75
  }
 ],
 "id": "overlay_A992D136_B3DD_3890_41CD_3D416A12445C",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 54.95,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0_HS_5_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -47.86,
   "hfov": 9.75
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964, this.camera_FBBD2CD2_B265_7187_41B6_AF3815A50688); this.mainPlayList.set('selectedIndex', 8)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E76C979_B2A4_D085_41DD_78E4900D67CA",
   "yaw": -24.07,
   "pitch": -34.54,
   "distance": 100,
   "hfov": 9.71
  }
 ],
 "id": "overlay_A9C90898_B3DD_2990_41E5_09B93FDBE42B",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -24.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0_HS_6_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -34.54,
   "hfov": 9.71
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E751979_B2A4_D085_41DB_8331FD4589B4",
   "yaw": 56.24,
   "pitch": -28.24,
   "distance": 100,
   "hfov": 7.96
  }
 ],
 "id": "overlay_A832FD3B_B3DD_E890_41D0_D87E245953AE",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 56.24,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0_HS_7_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -28.24,
   "hfov": 7.96
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F, this.camera_FBDFFCB5_B265_718D_41E0_66B8298CE537); this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AE00D7FF_B3DD_6790_41E3_BAE8DD5D56CE",
   "yaw": 161.5,
   "pitch": -31.28,
   "distance": 100,
   "hfov": 14.61
  }
 ],
 "id": "overlay_A93ACBB9_B3DD_2F90_41CF_F5869AC2CF2F",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 161.5,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0_HS_8_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -31.28,
   "hfov": 14.61
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E694980_B2A4_D383_41D7_7C3601B90AC6",
   "yaw": -46.64,
   "pitch": -7.1,
   "distance": 100,
   "hfov": 10.22
  }
 ],
 "id": "overlay_ACD8102E_B26C_D09F_41E6_595754F09580",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -46.64,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -7.1,
   "hfov": 10.22
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5, this.camera_F5135A1B_B265_7085_41DD_CD046343228C); this.mainPlayList.set('selectedIndex', 21)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F456BC96_B264_D18F_41D5_52608CAA35A0",
   "yaw": -113.42,
   "pitch": -35.74,
   "distance": 100,
   "hfov": 13.93
  }
 ],
 "id": "overlay_9EE58BB6_B2E7_578F_41D5_19614D097C21",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -113.42,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0_HS_0_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -35.74,
   "hfov": 13.93
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0, this.camera_F5028A3B_B265_7085_41E1_9A24F0DE4460); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4592C97_B264_D18D_41C3_41BD2EF75621",
   "yaw": 70.8,
   "pitch": -40.62,
   "distance": 100,
   "hfov": 13.03
  }
 ],
 "id": "overlay_9DA0B4E4_B2E4_D183_41DE_2D6FBABEC730",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 70.8,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0_HS_1_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -40.62,
   "hfov": 13.03
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 29)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F459AC98_B264_D183_41D1_CB10235AE19C",
   "yaw": 110.4,
   "pitch": -1.7,
   "distance": 100,
   "hfov": 10.29
  }
 ],
 "id": "overlay_9D2AEBA8_B2EC_D782_41CE_DC49E514A635",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 110.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.7,
   "hfov": 10.29
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 25)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F459DC98_B264_D183_41E2_87BE6981479D",
   "yaw": 73.61,
   "pitch": -1.7,
   "distance": 100,
   "hfov": 10.29
  }
 ],
 "id": "overlay_83B471FC_B2EF_5383_41E0_68BC97337C77",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 73.61,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0_HS_3_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -1.7,
   "hfov": 10.29
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4, this.camera_F5D52805_B265_708D_41E6_77487B03653D); this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E6B797E_B2A4_D37F_41CC_3BF649CD30C9",
   "yaw": -67.23,
   "pitch": 17.31,
   "distance": 100,
   "hfov": 9.83
  }
 ],
 "id": "overlay_AF62663A_B3A4_F890_41CA_F4D4F0F835E5",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -67.23,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 17.31,
   "hfov": 9.83
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE, this.camera_F5CF5828_B265_7084_41D0_4200AE9392A5); this.mainPlayList.set('selectedIndex', 15)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E6BD97F_B2A4_D37D_41E5_6AEDA61FFFAC",
   "yaw": 12.66,
   "pitch": 12.51,
   "distance": 100,
   "hfov": 10.05
  }
 ],
 "id": "overlay_AFE61522_B3A4_D8B0_41CA_6C36301BE9FD",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 12.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 12.51,
   "hfov": 10.05
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BFA221F6_B265_7B90_41CE_29AB30599647, this.camera_F5BA5848_B265_7083_41D8_90A45FCA007E); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E6A397F_B2A4_D37D_417E_E8A74AD3309D",
   "yaw": 64.33,
   "pitch": -31.76,
   "distance": 100,
   "hfov": 12.72
  }
 ],
 "id": "overlay_AE365849_B3AC_E8F0_41E1_371706283599",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 64.33,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0_HS_2_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -31.76,
   "hfov": 12.72
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246, this.camera_FBF1AC90_B265_7183_41E2_E75D59A1F5B9); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4213CA4_B264_D183_41D9_3404A9E1747F",
   "yaw": -150.97,
   "pitch": 23.9,
   "distance": 100,
   "hfov": 9.41
  }
 ],
 "id": "overlay_84A6FE9C_B2A5_5183_41C4_DE25B2FDCDB7",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -150.97,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 23.9,
   "hfov": 9.41
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277, this.camera_FBE13CA6_B265_718F_41B8_9CE9F073BDF4); this.mainPlayList.set('selectedIndex', 30)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F421BCA5_B264_D18D_41E3_419EB6E3F522",
   "yaw": 33.39,
   "pitch": -41.99,
   "distance": 100,
   "hfov": 12.75
  }
 ],
 "id": "overlay_8BF4F4FB_B2AB_7185_41E6_144D221797DD",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 33.39,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0_HS_1_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -41.99,
   "hfov": 12.75
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD, this.camera_F129DE4F_B265_709D_41DD_FC415D6BD5BA); this.mainPlayList.set('selectedIndex', 20)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F457FC95_B264_D18D_41D4_D7836828C8F1",
   "yaw": -84.46,
   "pitch": -39.59,
   "distance": 100,
   "hfov": 13.22
  }
 ],
 "id": "overlay_9FDA79AE_B2E5_539F_41D4_43B53BDD983A",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -84.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0_HS_0_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -39.59,
   "hfov": 13.22
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D, this.camera_F12E1E5E_B265_70BF_41E6_2C5843759E76); this.mainPlayList.set('selectedIndex', 22)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4567C95_B264_D18D_41E4_593075CC7274",
   "yaw": 44.99,
   "pitch": -34.78,
   "distance": 100,
   "hfov": 14.09
  }
 ],
 "id": "overlay_9EBD2C57_B2E5_308D_41D1_9235F961E01A",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 44.99,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0_HS_1_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -34.78,
   "hfov": 14.09
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4202CA5_B264_D18D_41E2_866AB6440F48",
   "yaw": -32.91,
   "pitch": -7.4,
   "distance": 100,
   "hfov": 10.21
  }
 ],
 "id": "overlay_8B6F3521_B2AD_3082_41D1_88B1B47BF2B1",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -32.91,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": -7.4,
   "hfov": 10.21
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824, this.camera_F53549DA_B265_7387_4177_24B218E3F9F4); this.mainPlayList.set('selectedIndex', 29)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4204CA6_B264_D18F_41C4_6CACE6B13BF4",
   "yaw": -34.7,
   "pitch": -55.44,
   "distance": 100,
   "hfov": 9.73
  }
 ],
 "id": "overlay_8B3B7045_B2AF_508D_41E5_BDB169719BCD",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -34.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0_HS_1_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -55.44,
   "hfov": 9.73
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F, this.camera_F52349F8_B265_7383_41DC_2E162BCB27C0); this.mainPlayList.set('selectedIndex', 31)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F420ECA6_B264_D18F_41E2_498796588D8F",
   "yaw": -160.35,
   "pitch": -45.63,
   "distance": 100,
   "hfov": 7.58
  }
 ],
 "id": "overlay_88BBE5D6_B2AB_738F_41E5_1B9B138ABBE1",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -160.35,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0_HS_2_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -45.63,
   "hfov": 7.58
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BEC36130_B265_3890_41D7_1592326A619A, this.camera_F576A933_B265_7085_41D5_48D54A89207E); this.mainPlayList.set('selectedIndex', 11)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9169A5A0_B3A5_3BB0_41D3_A42DCDD4201D",
   "yaw": 142.36,
   "pitch": -47.7,
   "distance": 100,
   "hfov": 19.76
  }
 ],
 "id": "overlay_A852E32A_B3A7_38B0_41BC_FDF300516C3C",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 142.36,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0_HS_2_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -47.7,
   "hfov": 19.76
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BFA221F6_B265_7B90_41CE_29AB30599647, this.camera_F57A5910_B265_7083_41E0_46D7A2FAF2B1); this.mainPlayList.set('selectedIndex', 9); this.mainPlayList.set('selectedIndex', 9)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01c"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_9E75F97C_B2A4_D083_41E5_614FB6604249",
   "yaw": -98.4,
   "pitch": -45.04,
   "distance": 100,
   "hfov": 10.85
  }
 ],
 "id": "overlay_A9EC93C4_B3A4_FFF0_41D4_3B46799CAD0C",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -98.4,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0_HS_3_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -45.04,
   "hfov": 10.85
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 13)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_916A75A1_B3A5_3BB0_41DC_6BD7AAE0E417",
   "yaw": -128.25,
   "pitch": 2.76,
   "distance": 100,
   "hfov": 10.28
  }
 ],
 "id": "overlay_A914E475_B3A5_3890_4197_39EA450AD7E0",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -128.25,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.76,
   "hfov": 10.28
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 12)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F6AEB170_B26D_7083_41DA_694C9E25D7FA",
   "yaw": -120.63,
   "pitch": -22.91,
   "distance": 100,
   "hfov": 9.23
  }
 ],
 "id": "overlay_8C2AE618_B26F_F083_41D6_59469DD8A48D",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -120.63,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0_HS_5_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -22.91,
   "hfov": 9.23
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06b"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_AA691ABA_B3AD_6990_41E5_2D19869849FD",
   "yaw": 88.85,
   "pitch": -16.32,
   "distance": 100,
   "hfov": 17.39
  }
 ],
 "id": "overlay_BC8C2A95_B25D_2990_41E5_D85F48EDA4A7",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 88.85,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0_HS_0_0_0_map.gif",
      "width": 32,
      "height": 16
     }
    ]
   },
   "pitch": -16.32,
   "hfov": 17.39
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246, this.camera_FB9B2CEF_B265_719D_41B9_B5CFBE0F9A14); this.mainPlayList.set('selectedIndex', 24)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F45C5CA2_B264_D187_41CD_B976094F1C3B",
   "yaw": -131.47,
   "pitch": 16.76,
   "distance": 100,
   "hfov": 9.86
  }
 ],
 "id": "overlay_86DE4D62_B2A5_3087_41D7_2125C73F7EFB",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -131.47,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 16.76,
   "hfov": 9.86
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_BED482FE_B267_3990_41C2_70989461517C, this.camera_F13B9E20_B265_7083_41E4_32FD90CC6107); this.mainPlayList.set('selectedIndex', 26)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F45CFCA2_B264_D187_41C2_016D3DA922FA",
   "yaw": 116.92,
   "pitch": -35.61,
   "distance": 100,
   "hfov": 13.95
  }
 ],
 "id": "overlay_86ADDBF1_B2BB_D782_41D9_68E70776E5E8",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 116.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0_HS_1_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -35.61,
   "hfov": 13.95
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 04a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A8B8214D_B3A5_78F0_41B7_0FA882BA1758",
   "yaw": 92.07,
   "pitch": -23.87,
   "distance": 100,
   "hfov": 13.29
  }
 ],
 "id": "overlay_A2435470_B25D_3890_41D0_045F44D85F20",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 92.07,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_1_HS_0_0_0_map.gif",
      "width": 22,
      "height": 16
     }
    ]
   },
   "pitch": -23.87,
   "hfov": 13.29
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB, this.camera_F1196E7C_B265_7083_41E6_0B474259C078); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A8BA9150_B3A5_7890_41E0_453FF53966DE",
   "yaw": -88.26,
   "pitch": -27.44,
   "distance": 100,
   "hfov": 15.66
  }
 ],
 "id": "overlay_A0420343_B26B_78F0_41DF_5672C7BA0678",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -88.26,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_1_HS_0_0_0_map.gif",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -27.44,
   "hfov": 15.66
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A8BAA151_B3A5_7890_41DD_369ED6D88A10",
   "yaw": -65.82,
   "pitch": -17.28,
   "distance": 100,
   "hfov": 16.85
  }
 ],
 "id": "overlay_A0B1FD58_B26D_2890_41E6_11C50BC220A2",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -65.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_1_HS_1_0_0_map.gif",
      "width": 27,
      "height": 16
     }
    ]
   },
   "pitch": -17.28,
   "hfov": 16.85
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A5380597_AF18_F31C_41C3_5495F01B6318, this.camera_F1242E6D_B265_709D_41E2_AA77C9350E16); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_A8BA3152_B3A5_7890_41A8_6235E9F4EEA9",
   "yaw": 94.32,
   "pitch": 0.72,
   "distance": 100,
   "hfov": 20.45
  }
 ],
 "id": "overlay_A10860CC_B27D_D9F0_41DF_D09EC81D32BB",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 94.32,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 0.72,
   "hfov": 20.45
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277, this.camera_F0F7EEEE_B265_719E_41E3_8267ED0252CD); this.mainPlayList.set('selectedIndex', 30)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4236CA7_B264_D18D_41A4_DB013FD607F6",
   "yaw": 106.49,
   "pitch": -39.93,
   "distance": 100,
   "hfov": 9.37
  }
 ],
 "id": "overlay_88B35DF0_B2A4_D383_41E5_84A546F33034",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 106.49,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0_HS_0_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -39.93,
   "hfov": 9.37
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 29)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Point 01a"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4239CA7_B264_D188_41E2_4C0A900A28C2",
   "yaw": 80.82,
   "pitch": -31.62,
   "distance": 100,
   "hfov": 9
  }
 ],
 "id": "overlay_8E9C684D_B2A5_D09D_41C2_885B14C0F4DE",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 80.82,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0_HS_1_0_0_map.gif",
      "width": 26,
      "height": 16
     }
    ]
   },
   "pitch": -31.62,
   "hfov": 9
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 23); this.mainPlayList.set('selectedIndex', 23)"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Circle Door 02"
 },
 "useHandCursor": true,
 "enabledInCardboard": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_F4208CAE_B264_D19F_417F_835367CAC51E",
   "yaw": 70.18,
   "pitch": 2.63,
   "distance": 100,
   "hfov": 10.28
  }
 ],
 "id": "overlay_885E4380_B2A7_F783_41D0_3F3B50EB3DA6",
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 70.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "class": "ImageResourceLevel",
      "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0_HS_2_0_0_map.gif",
      "width": 16,
      "height": 16
     }
    ]
   },
   "pitch": 2.63,
   "hfov": 10.28
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_9E6D398A_B2A4_D387_41DC_C273614857F1",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0_HS_0_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_9E6D998A_B2A4_D387_41E4_434D2C1149BB",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0_HS_1_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_9E6C098B_B2A4_D386_41CC_219CC1ACEF39",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3DEF9C3_AF3F_5374_41DC_9C3D36C079D4_0_HS_2_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_9E6E6989_B2A4_D385_41DF_BAEF19D4B4CB",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0_HS_0_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_9E6ED98A_B2A4_D387_41D2_B4336B74B397",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3C32B3E_AF3F_770C_41D9_997181FA3423_0_HS_1_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_A8BBF153_B3A5_7890_4154_97F249683143",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_1_HS_0_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_AA978ABC_B3AD_6991_41E4_C2BBF5261FCA",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A5380597_AF18_F31C_41C3_5495F01B6318_0_HS_2_0.png",
   "width": 1000,
   "height": 660
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_A8B9E14E_B3A5_78F0_41AE_B2506AA79838",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A5009292_AF19_3114_41CA_7DA731CF7223_1_HS_0_0.png",
   "width": 480,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_916A45A1_B3A5_3BB0_41E5_E5EE01213A6D",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0_HS_0_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_916AC5A2_B3A5_3BB0_41B5_1A1FA8A1053E",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0_HS_1_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_916B05A2_B3A5_3BB0_41E5_008A1F5C0099",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BEC36130_B265_3890_41D7_1592326A619A_0_HS_2_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_A8BD1156_B3A5_7890_41DF_10D38DFC6240",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_1_HS_1_0.png",
   "width": 1000,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_A8BEF157_B3A5_7890_41A3_E1716F263F73",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_1_HS_2_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_AED5FE0F_B3E5_2870_41D3_7A4414A6870C",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0_HS_4_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_AED58E0F_B3E5_2870_41C5_26F3B61EE3F9",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BC1C4D3A_B25C_E890_41E4_0A2AE0416964_0_HS_5_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_A8BC6155_B3A5_7890_41DD_9241AE01C5AA",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_1_HS_2_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_AE225772_B3A5_D890_4180_66D49EAF943F",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0_HS_5_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_AED71E0E_B3E5_2870_41E4_F33A8F2F093C",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0_HS_8_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_AED4AE0E_B3E5_2870_41C4_B97F4CEDC65C",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0_HS_9_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_9E70B970_B2A4_D083_41E1_0350E4348493",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BF6E7B0F_B25D_2870_41B1_C4B739147291_0_HS_10_0.png",
   "width": 1000,
   "height": 660
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 21,
 "colCount": 4,
 "id": "AnimatedImageResource_A8B9414F_B3A5_78F0_41C0_E7494D7AFE1E",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_1_HS_0_0.png",
   "width": 480,
   "height": 510
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_A8B9014F_B3A5_78F0_41CD_C64A6FDFE016",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A53C1DDE_AF19_330C_41E0_5F9992C833DB_1_HS_1_0.png",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_9E687981_B2A4_D385_41C4_92A9F88043EF",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0_HS_0_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_9E68D987_B2A4_D38D_41E2_075BF70A05CE",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A2CB1E3C_AF39_510C_41B0_96D63217D213_0_HS_1_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_9E69A981_B2A4_D385_41E4_441F73F9E690",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0_HS_0_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_9E680981_B2A4_D385_41D1_64C265B8FC50",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3DD6B12_AF39_7714_41D9_2DDFACD2FCBE_0_HS_1_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_F4231CAE_B264_D19F_41D8_6ED270E04576",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0_HS_0_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_F423BCAF_B264_D19D_41BB_F206502B9679",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BE8E5F0D_B25B_6870_41CA_D3215C089F94_0_HS_1_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_F4587C98_B264_D183_41E0_82775D5DBA95",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0_HS_0_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_F458FC99_B264_D185_41B5_E61F8F2A0519",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0_HS_1_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_F45B7C99_B264_D185_41BF_E1CB5D22A82E",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0_HS_2_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_F45B8C9A_B264_D187_41E2_23920DB19D53",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0_HS_3_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_F45A0C9A_B264_D187_41C0_A911EA55CE8E",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3C6A553_AF3F_D31B_41DB_50BC5EA68CC0_0_HS_4_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_9E6A897F_B2A4_D37D_41DD_57D0569EB6FD",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0_HS_0_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_9E6AE980_B2A4_D383_41AA_D6C45CB88A80",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A2B1201C_AF38_D10C_41E3_48656C2560F4_0_HS_1_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_F45A8C9B_B264_D185_41AA_DB97939457F2",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0_HS_0_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_F45D0CA0_B264_D183_41D0_7FCE25042AED",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0_HS_1_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_F45DACA1_B264_D185_41DB_2E75BE99F678",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0_HS_2_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_F45C2CA1_B264_D185_41DD_1BAB6CD868A1",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3C322C5_AF3F_317C_41CF_C7065C9D6246_0_HS_3_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_9E6C798B_B2A4_D386_41BD_EE29C821AEE1",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0_HS_0_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_9E6CC98C_B2A4_D382_41E2_5104A5A0B7F9",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3D8671C_AF3F_3F0C_41DA_C7B9A3A41FDD_0_HS_1_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_F45E1CA3_B264_D185_41E6_3624AD518E8D",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0_HS_0_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_F45E8CA4_B264_D183_41DE_B7320A38C672",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BEC6D1DD_B267_5B90_41A3_B5C60FE5E605_0_HS_1_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_F45F1CA2_B264_D187_41E0_17D13CE6B15D",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0_HS_0_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_F45F8CA3_B264_D185_41C2_87E573F7D49A",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BED482FE_B267_3990_41C2_70989461517C_0_HS_1_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_F4220CAF_B264_D19D_41E3_343030B63977",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0_HS_0_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_F422BCB0_B264_D183_41D3_A4E7EEE4F073",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BF73ED01_B25B_6870_41D4_A606E28E86EF_0_HS_1_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_9E6F3988_B2A4_D383_41D2_B21427D0AE01",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0_HS_0_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_9E6F9988_B2A4_D383_41E5_0AE2A3C81908",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0_HS_1_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_9E6FF988_B2A4_D383_41E4_9081002822D0",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3D41E26_AF3F_513C_41E5_1E95EFDED7BF_0_HS_2_0.png",
   "width": 1000,
   "height": 660
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_AED7FE0D_B3E5_2870_41E1_D0DC72A26482",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A534A87C_AF1F_310C_41E4_0FFC814ECE9E_0_HS_1_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_A8BE4159_B3A5_7890_41B9_D6A060599E68",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_1_HS_4_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_9168359C_B3A5_3B90_41A0_A3ED2F57FE5D",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0_HS_5_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_9E76C979_B2A4_D085_41DD_78E4900D67CA",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0_HS_6_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_9E751979_B2A4_D085_41DB_8331FD4589B4",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0_HS_7_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_AE00D7FF_B3DD_6790_41E3_BAE8DD5D56CE",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BFA221F6_B265_7B90_41CE_29AB30599647_0_HS_8_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_9E694980_B2A4_D383_41D7_7C3601B90AC6",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_AC14D27A_B265_3087_41B3_BEAFC3D8C08E_1_HS_0_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_F456BC96_B264_D18F_41D5_52608CAA35A0",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0_HS_0_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_F4592C97_B264_D18D_41C3_41BD2EF75621",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0_HS_1_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_F459AC98_B264_D183_41D1_CB10235AE19C",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0_HS_2_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_F459DC98_B264_D183_41E2_87BE6981479D",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3FB4954_AF3F_F31C_41C5_1D003A72568D_0_HS_3_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_9E6B797E_B2A4_D37F_41CC_3BF649CD30C9",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0_HS_0_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_9E6BD97F_B2A4_D37D_41E5_6AEDA61FFFAC",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0_HS_1_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_9E6A397F_B2A4_D37D_417E_E8A74AD3309D",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A53A81D4_AF18_D31C_41CC_4336995BBA5F_0_HS_2_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_F4213CA4_B264_D183_41D9_3404A9E1747F",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0_HS_0_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_F421BCA5_B264_D18D_41E3_419EB6E3F522",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A29E0407_AF2F_D0FB_41E5_653715D8A824_0_HS_1_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_F457FC95_B264_D18D_41D4_D7836828C8F1",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0_HS_0_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_F4567C95_B264_D18D_41E4_593075CC7274",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A3D9BB4D_AF3F_D70F_41D7_C5568107E9F5_0_HS_1_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_F4202CA5_B264_D18D_41E2_866AB6440F48",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0_HS_0_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_F4204CA6_B264_D18F_41C4_6CACE6B13BF4",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0_HS_1_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_F420ECA6_B264_D18F_41E2_498796588D8F",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A2166180_AF2F_33F4_41DC_0DF743B9D277_0_HS_2_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_9169A5A0_B3A5_3BB0_41D3_A42DCDD4201D",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0_HS_2_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_9E75F97C_B2A4_D083_41E5_614FB6604249",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0_HS_3_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_916A75A1_B3A5_3BB0_41DC_6BD7AAE0E417",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0_HS_4_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_F6AEB170_B26D_7083_41DA_694C9E25D7FA",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BEEF6186_B265_5870_41B2_01B52D376C47_0_HS_5_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_AA691ABA_B3AD_6990_41E5_2D19869849FD",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A52F3B91_AF19_7714_41DE_E532DB19D397_0_HS_0_0.png",
   "width": 480,
   "height": 360
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_F45C5CA2_B264_D187_41CD_B976094F1C3B",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0_HS_0_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_F45CFCA2_B264_D187_41C2_016D3DA922FA",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_BEB9A3EE_B264_DFB0_41E2_DA82581C7D32_0_HS_1_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 21,
 "colCount": 4,
 "id": "AnimatedImageResource_A8B8214D_B3A5_78F0_41B7_0FA882BA1758",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A50DD765_AF19_5F3C_41E1_BBE9ED7C056C_1_HS_0_0.png",
   "width": 480,
   "height": 510
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_A8BA9150_B3A5_7890_41E0_453FF53966DE",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_1_HS_0_0.png",
   "width": 480,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_A8BAA151_B3A5_7890_41DD_369ED6D88A10",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_1_HS_1_0.png",
   "width": 480,
   "height": 420
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_A8BA3152_B3A5_7890_41A8_6235E9F4EEA9",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A5318996_AF18_D31C_4192_95A25E17DCE8_1_HS_2_0.png",
   "width": 800,
   "height": 1200
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_F4236CA7_B264_D18D_41A4_DB013FD607F6",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0_HS_0_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "colCount": 4,
 "id": "AnimatedImageResource_F4239CA7_B264_D188_41E2_4C0A900A28C2",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0_HS_1_0.png",
   "width": 1000,
   "height": 900
  }
 ]
},
{
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "colCount": 4,
 "id": "AnimatedImageResource_F4208CAE_B264_D19F_417F_835367CAC51E",
 "rowCount": 6,
 "frameDuration": 41,
 "levels": [
  {
   "class": "ImageResourceLevel",
   "url": "media/panorama_A21A2014_AF2F_511D_41E0_E0B523A7CE4F_0_HS_2_0.png",
   "width": 800,
   "height": 1200
  }
 ]
}],
 "backgroundPreloadEnabled": true,
 "minWidth": 20,
 "desktopMipmappingEnabled": false,
 "vrPolyfillScale": 0.5,
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "mouseWheelEnabled": true,
 "gap": 10,
 "overflow": "visible",
 "data": {
  "name": "Player436"
 },
 "shadow": false
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
