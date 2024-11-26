// lib dev by vishal rathour
// version 0.0.4

function adsExpendble(options){
    this.isOpen = options.oneTimeOpen || false;
    this.mobileDimention = options.view || {};
    this.src = options.src;
    this.renderCount = 0;
    this.frame = null;
    this.banner_element = null;
    this.expendable_element = null;
    this.eventType = options.eventType || 'mouseover';
    this.adsWrapper = options.adsWrapper || null;
    this.c_name = options.cookieName || 'first-time-open-ads';
    this.gwdAd = options.adsWrapper || null;
    this.defaltViewID = options.id || 'pagedeck';
    this.mouseHoverElement = options.mouseHoverElement || null;
};

adsExpendble.prototype.init = function(){
    if(this.renderCount === 0){
        this.renderCount = 1;
        this.banner_element = document.querySelector("#banner-page");
        this.expendable_element = document.querySelector("#expanded-page");
        this.frame = window.frameElement || null;
        this.render()
    }
}

adsExpendble.prototype.manageDefalutView = function(){
        let d = document.getElementById(this.defaltViewID);
        let defalut_page = d.getAttribute('default-page');
        defalut_page == 'expanded-page' ? this.expendView() : this.bannerView();
}


adsExpendble.prototype.render = function(){
    this.isOpen === true ? this.oneTimeOpen():this.manageDefalutView();
    this.eventHandle();
}

adsExpendble.prototype.bannerView = function(){
    if(this.frame){
        let w = this.mobileDimention.mobile.width ? this.mobileDimention.mobile.width : 300;
        let h = this.mobileDimention.mobile.height ? this.mobileDimention.mobile.height : 250;
        this.frame.style.cssText = `height:${h}px;width:${w}px;border:0`;
        this.frame.setAttribute('scrolling','no');
        if(this.gwdAd.actions?.gwdPagedeck){this.gwdAd.actions.gwdPagedeck.goToPage('gwd-ad', 'banner-page');}
        else{this.gwdAd.actions.gwdGoogleAd.goToPage('gwd-ad', 'banner-page');}
    }
}
adsExpendble.prototype.expendView = function(){
    if(this.frame){
        let frameStyle = "width:100vw; height:100vh; position:fixed; z-index:99999; top:0px; left:0%;border:0";
        this.frame.setAttribute('scrolling','no');
        this.frame.style.cssText = frameStyle;
        if(this.gwdAd.actions?.gwdPagedeck){this.gwdAd.actions.gwdPagedeck.goToPage("pagedeck","expanded-page");}
        else{this.gwdAd.actions.gwdGoogleAd.goToPage("pagedeck","expanded-page");}
    }
}

adsExpendble.prototype.setCookie = function(cname, cvalue, exdays){
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  
};
  
adsExpendble.prototype.check_cookie_name = async function(name){
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {return match[2]}
    else{this.setCookie(this.c_name,1,1);return null}
};

adsExpendble.prototype.eventHandle = function(){
    this.gwdAd.actions.events.addHandler(this.mouseHoverElement,this.eventType,()=>{this.expendView();});
    this.gwdAd.actions.events.addHandler("close-button","action", ()=>{this.bannerView();});
    window.onfocus = ()=>{this.bannerView();}
}

adsExpendble.prototype.oneTimeOpen = async function(){
    if(this.isOpen === true){
        if(this.check_cookie_name(this.c_name) !== null){
          var value = await this.check_cookie_name(this.c_name)
          if(Number(value) === 1){
              var old_value = Number(value) + 1
              this.setCookie(this.c_name,old_value,1);
              this.expendView()
          }
          else{
              
            let d = document.getElementById(this.defaltViewID);
            d && d.setAttribute('default-page','banner-page');
            this.bannerView()
          }
      }
      else
      {
          var value = await this.check_cookie_name(this.c_name)
          var old_value = Number(value) + 1
          this.setCookie(this.c_name,old_value,1)
          this.expendView()
      }

    } 
}
