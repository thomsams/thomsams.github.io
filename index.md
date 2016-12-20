---
layout: default
title: "New Media Design & Development I"
---
<div id="container__maps">
</div>
<!--  LOGO HEADER CONTAINER -->
<div class="container header__block offCanvas__top">
    <div class="row">
        <div class="column-12">
            <img src="assets/logo_energhentic.svg" class="logo__main" alt="logo Energhentic">
            <p class="align__middle"><i class="fa fa-chevron-down user__template--close" aria-hidden="true"></i></p>
        </div>
    </div>
</div>


<!--  LOGIN CONTAINER -->
<div class="container login__block offCanvas__top--open">
    <div class="row">
        <div class="column-12">
            <img src="assets/logo_energhentic.svg" class="logo__main" alt="logo Energhentic">
        </div>
        <div class="column-12 ">
            <form id="frm-login">
            <p class="text__error login__error"></p>
            <div class="login__inputGroup">
                <input class="login__input input__base" type="text" id="txtUserName" name="txtUserName" placeholder="username">
            </div>
            <div class="login__inputGroup">
                <input class="login__input input__base" type="password" id="txtPassWord" name="txtPassWord"  placeholder="password">
            </div>
            <button class="login__submitButton button__base input__base" type="submit">
                Log in
            </button>
            </form>
        </div>
    </div>
</div>
<!--  USER CONTAINER -->
<div class="container user__template offCanvas__top">
    <div class="row">
        <div class="column-12">
            <img src="assets/logo_energhentic.svg" class="logo__main" alt="logo Energhentic">
        </div>
    </div>
    <div class="row">
        <div class="column-12 clearfix">
            <div class="user__img-clipArt">
                <img src="assets/user_img_setting.svg" alt="user image setting" class="user__imgSetting">
                <div class="user__img-container">
                    <img src="assets/user_placeholder_danny.jpg" alt="user image" class="user__imgPlaceholder">
                </div>
            </div>
            <div class="user__data">
                <h1 class="user__username">Username</h1>
                <p class="user__info">user info <br>more info<br> even more info</p>
                <p class="user__workoutCount text__accent">Total workouts done: </p>
                 <button id="logout__submitButton" class="button__base logout__submitButton" type="submit">
                Log out
                        </button>
                        <i class="fa fa-chevron-up user__template--close" aria-hidden="true"></i>
            </div>
        </div>
    </div>
     
</div>


<!-- filter container -->
<div class="container filter__block offCanvas__bottom--hidden">
    <div class="row">
        <div class="column-12 ">
            <button type="submit" class="input__base button__base filter__openButton">filter</button>
            <form id="frm-filter">
                <p class="text__accent submenu__title">Filter</p>
                <div class="inputGroup">
                    <label for="filter__basket">Basket</label>
                    <input class="" id="filter__basket" type="checkbox" name="filter__basket">
                </div>
                <div class="inputGroup">
                    <label for="filter__voetbal">Voetbal</label>
                    <input class="" id="filter__voetbal" type="checkbox" name="filter__voetbal">
                </div>
                <div class="inputGroup">
                    <label for="filter__fitness">Fitness</label>
                    <input class="" id="filter__fitness" type="checkbox" name="filter__fitness">
                </div>
                <div class="inputGroup">
                    <label for="filter__loop">Looproutes</label>
                    <input class="" id="filter__loop" type="checkbox" name="filter__loop">
                </div>
                <div class="inputGroup">
                    <label for="filter__users">Energhentic users aanwezig</label>
                    <input class="" id="filter__users" type="checkbox" name="filter__users">
                </div>
                <button type="submit" class="input__base button__base filter__submitButton">Apply</button>
            </form>
        </div>
    </div>
</div>

<!-- sports activity container -->
<div class="container activityDetail__block offCanvas__bottom--hidden">
    <div class="row">
        <div class="column-12 activity__detail--extra">
            <a class="activity__detail--close fa fa-times"></a>
        </div>
        <div class="column-12 activity__detail--container">
            <p class="text__accent submenu__title activity__detail--title">activiteitsnaam</p>
            <p class="activity__detail--adress">adres gent<br>9000 Gent</p>
            <p class="activity__detail--description"></p>
            <p class="activity__detail--distance">Afstand: 2km</p>
            <p class="text__accent submenu__title activity__detail--present">Present users:</p>
            <div class="activity__detail--userContainer"></div>
            <button type="submit">Check in</button>
        </div>
    </div>
</div>