# full-page-ads-gwd
Seamless Full-Page Ads with GWD: Expand Your Google Ads Iframe for Maximum Impact

```
  <script>
    let adsOBJ = {oneTimeOpen:false,view:{mobile:{'width':'970','height':'90'}},
    eventType:'click',adsWrapper:gwd,cookieName:'manage-one-time-21-11-2024',id:'pagedeck',mouseHoverElement:'expand-button'};
        adsOBJ.src = 'adsExpendble.js';
        let script = document.createElement('script');script.src = adsOBJ.src;document.body.append(script);
        adsOBJ.adsManager = new Promise((res,rej)=>{script.onload = function() {res();};});
        adsOBJ.adsManager.then((data)=>{let adsTemplate = new adsExpendble(adsOBJ);adsTemplate.init();});
  </script>
```

# options

Show the ad in extended view only once every 24 hours by setting ```oneTimeOpen:true```.

Set the fixed width and height using ```mobile:{'width':'970','height':'90'}``` in ```view```

set cookie name using ```cookieName:'manage-one-time-21-11-2024'```

set mouse hover or click element id using ```mouseHoverElement:'expand-button'```

Define the event type to trigger the extended view using event listeners, such as click or mouseover.
```eventType:'click'```  or   ```eventType:'mouseover'```
