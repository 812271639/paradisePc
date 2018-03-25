/**
 * Created by Master on 2017/2/24.
 */
angular.module('paradiseApp')
    .directive('announcement', function (localSession) {
        return {
            restrict: 'E',
            scope: {
            },
            templateUrl: 'js/directives/tpls/announcement.html',
            link: function (scope) {
              if (typeof localSession.getObject('announcement') === 'object') {
                scope.announcement = false;
              } else {
                scope.announcement = localSession.getObject('announcement');
              }
              scope.checkAnnouncement = function() {
                if (typeof localSession.getObject('announcement') !== 'object' && localSession.getObject('announcement')) {
                  localSession.setObject('announcement', false);
                  scope.announcementSelect = false;
                } else {
                  localSession.setObject('announcement', true);
                  scope.announcementSelect = true;
                }
              }
        }
    }})
