$( document ).ready(function() {
  (function(){

    //------------------------------------------------------ Op login drukken, login gaat omhoog, Userscherm komt naar beneden----------------------------------------//
    var toggleOpen=$('.login__submitButton');
    if(toggleOpen)
    {
      
      $('.login__submitButton').click(function(e)
      {
        e.preventDefault();
        $('.login__block').toggleClass('offCanvas__top');
        $('.user__template').toggleClass('offCanvas__top--open');
        $('.login__block').toggleClass('offCanvas__top--open');
        $('.user__template').toggleClass('offCanvas__top');
        return false;
      })
    }
  
  //------------------------------------------------------ OP user sluitknop gedrukt, User blok gaat omhoog, logo komt naar beneden, filter verschijnt ----------------------------------------//
    var toggleUser=$('.user__template--close');
     if(toggleUser)
    {
      toggleUser.click(function(e)
      {
        e.preventDefault();
        
      
        $('.user__template').toggleClass('offCanvas__top');
        $('.user__template').toggleClass('offCanvas__top--open');
         $('.header__block').toggleClass('offCanvas__top');
        $('.header__block').toggleClass('offCanvas__top--open');
        $('.filter__block').toggleClass('offCanvas__bottom--hidden');
        $('.filter__block').toggleClass('offCanvas__bottom');
        
        return false;
      })
    }


//------------------------------------------------------ Filter aangeklikt, filterblok opent, als er nog iets openstaat, sluit dit ----------------------------------------//
    var toggleFilter=$('.filter__openButton');
     if(toggleFilter)
    {
      toggleFilter.click(function(e)
      {
        e.preventDefault();
        
      
        $('.filter__block').toggleClass('offCanvas__bottom');
        
        return false;
      })
    }
//------------------------------------------------------ Filtersubmit aangeklikt, filterblok sluit en filters worden toegepast ----------------------------------------//
    var toggleFilter=$('.filter__submitButton');
     if(toggleFilter)
    {
      toggleFilter.click(function(e)
      {
        e.preventDefault();
        
      
        $('.filter__block').toggleClass('offCanvas__bottom');
        
        return false;
      })
    }


  })();
});