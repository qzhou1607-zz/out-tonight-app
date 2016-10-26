'use strict';

(function () {

   var profileUsername = document.querySelector('#profile-username') || null;
   var logLink = document.getElementById('log-toggle');
   var logText = document.getElementById('log-btn-toggle');
   var searchBar = document.querySelector('.search-bar');
   var searchBtn = document.querySelector('.search-btn');
   var apiUrl = appUrl + '/api/:id';
   var clickUrl = appUrl + '/api/:id/clicks';

   function getListHtml(imgUrl,reviewImgUrl, yelpUrl, yelpID, name,address_1,address_2) {
      
      var templ = '<div class="list-container">'
   					+ '<img class="bar-img" src="' + imgUrl + '">'
   					+ '<div class="bar-info">'
   					+	'<img src="' + reviewImgUrl + '">'
   					+	'<span><a target="_blank" href="' + yelpUrl + '">' + name + '</a></span>'
   					+	'<br>'
   					+	'<div class="bar-address">'
   					+		'<span>' + address_1 + '</span>'
   					+		'<br>'
   					+		'<span>' + address_2 + '</span>'
   					+	'</div>'
   				+	'</div>'
   				+  '<div class="people">'
					+     '<div><span class="number" id="' + yelpID + '"></span> people are going.</div>'
					+     '<button class="add" data-id="' + yelpID + '">Going</button>'
					+     '<button class="delete" data-id="' + yelpID + '">Not Going</button>'
					+  '<div>'
   			+	'</div>';
		return templ;
   }
   
   function updateClicks(yelpID) {
      var peopleCounts = document.getElementById(yelpID);
      ajaxFunctions.ajaxRequest('GET', (clickUrl + '?yelpID=' + yelpID), 
      function(count) {
            update(count,peopleCounts);
      });   
   }
   
   function update (count,peopleCounts) {
      console.log(count);
      peopleCounts.innerHTML = count;
   }
   
   
   
   //search
   searchBtn.addEventListener('click',function() {
      ajaxFunctions.ajaxRequest('GET',(appUrl + '/api/search?location=' + searchBar.value),function(data) {
         document.querySelector('.search-result').innerHTML="";
         var bars = JSON.parse(data);
         bars.forEach(function(item) {
            var obj = {
               'imgUrl':item.image_url,
               'reviewImgUrl':item.rating_img_url_large,
               'yelpUrl':item.url,
               'yelpID':item.id,
               'name':item.name,
               'address_1':item.location.display_address[0],
               'address_2':item.location.display_address[1],
            }
         document.querySelector('.search-result').innerHTML += getListHtml(
               obj.imgUrl, obj.reviewImgUrl, obj.yelpUrl, obj.yelpID, obj.name,obj.address_1,obj.address_2);
         });
         
         //update people count
         var allPeopleCounts = document.querySelectorAll('.number');
         for(var i = 0; i < allPeopleCounts.length; i++) {
            updateClicks(allPeopleCounts[i].getAttribute('id'));
         }
        
         var addBtn = document.querySelectorAll('.add') || null;
         var deleteBtn = document.querySelectorAll('.delete') || null;
         
          //add me binding;
         if (addBtn != null) {
            for(var i = 0; i < addBtn.length; i++) {
               addBtn[i].addEventListener('click',function(event) {
                  var yelpID = event.target.getAttribute("data-id");
                  ajaxFunctions.ajaxRequest('POST',(clickUrl + '?yelpID=' + yelpID), function(data) {
                        console.log(data);
                        updateClicks(yelpID);
                  });
               });
            }
         }
         
         //delete me binding;
         if(deleteBtn != null) {
            for(var i = 0; i < deleteBtn.length; i++) {
               deleteBtn[i].addEventListener('click',function(event) {
                  var yelpID = event.target.getAttribute("data-id");
                  ajaxFunctions.ajaxRequest('DELETE',(clickUrl + '?yelpID=') + yelpID, function(data) {
                     console.log(data);
                     updateClicks(yelpID);
                  });
               });
            }
         }
         
         
      });
   });
   
   //load people#
   
   //load authenticate info
   ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      var userObject = JSON.parse(data);
      if (profileUsername !== null) {
         //toggle login/logout
         //updateHtmlElement(userObject, profileUsername, 'twitter.displayName'); 
         profileUsername.innerHTML = userObject.twitter.displayName;
         logLink.href = '/logout';
         logText.innerHTML = 'Logout';
         
         //automatic search
         searchBar.value = userObject.location;
         searchBtn.click();
      }

   }));
})();
