function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){
    
    var App = {
        "init": function() {
            this._unitTesting = false; // Unit Testing the features in ApplicationDbContext or not
            this._widthHandlebarsAndLoDash = true; // Use Handlebars Template Engine And LoDash or Not

            this.URLRANDOMUSERME = 'http://api.randomuser.me/?results=500&callback=json_callback';// Cache the url with random users in variable URLRANDOMUSERME

            this._applicationDbContext = ApplicationDbContext; // Reference to the ApplicationDbContext object
            this._applicationDbContext.init('ahs.mmp.Energhentic'); // Initialize the ApplicationDbContext object via the methode init. Do not forget the connection string as a parametervalue of this function
            this._userManager = UserManager; // Reference to the UserManager object
            this._userManager.init(this._applicationDbContext);// Initialize the UserManager object via the methode init. Do not forget the reference to the this._applicationDbContext variable as a parametervalue of this function

            this._frmLogin = document.querySelector('#frm-login'); // Cache Form Login
            this._logoutBtn = document.querySelector('#logout__submitButton'); //cache logout button
            this.registerEventListeners(); // Register the Event Listeners for all present elements

			this._hbsCache = {};// Handlebars cache for templates
			this._hbsPartialsCache = {};// Handlebars cache for partials

            this._activeUser = null; // Active User


            if(this._unitTesting || this._applicationDbContext.getLecturers() == null) {
                this.unitTests();
            }
        },
        "registerEventListeners": function() {

            // Event Listeners for Form Login
            if(this._frmLogin != null) {
                var self = this; // Hack for this keyword within an event listener of another object

                this._frmLogin.addEventListener('submit', function(ev) {
                    ev.preventDefault();

                    var userName = Utils.trim(this.querySelectorAll('[name="txtUserName"]')[0].value);
                    var passWord = Utils.trim(this.querySelectorAll('[name="txtPassWord"]')[0].value);
                    var result = self._userManager.login(userName, passWord);
                    if(result == null) {
                        $('.login__error').html('please check your credentials');
                    } else if(result == false) {
                        $('.login__error').html('please check your credentials');
                    } else {
                        self._activeUser = result; // User is Logged in
                        $('.user__imgPlaceholder').attr('src',self._activeUser.Picture);
                        $('.user__username').html(self._activeUser.UserName);
                        var info = self._activeUser.FirstName+" "+self._activeUser.SurName+"<br>"+self._activeUser.DayOfBirth+"<br>"+self._activeUser.Email;
                        $('.user__info').html(info);
                        Navigator.loginCorrect();
                    }
                    
                    return false;
                });
            }

            this._logoutBtn.addEventListener('click', function(ev) {
                self._userManager.logout();
                location.reload();
            });


        },

    "unitTests": function() {

            var self = this; // Closure
            if(this._applicationDbContext.getLecturers() == null) {

                // Load JSON from corresponding RandomUserMe API with certain URL
                Utils.getJSONPByPromise(this.URLRANDOMUSERME).then(
                    function(data) {
                        var users = data.results, lecturer = null, user = null;
                        for(var i=0;i<users.length;i++) {
                            user = users[i];
                            lecturer = new Lecturer();
                            lecturer.FirstName = user.name.first;
                            lecturer.SurName = user.name.last;
                            lecturer.DayOfBirth = new Date(user.dob);
                            lecturer.UserName = user.login.username;
                            lecturer.PassWord = user.login.password;
                            lecturer.Email = user.email;
                            lecturer.Picture = user.picture.large;
                            switch(user.gender) {
                                case 'male': lecturer.Gender = Genders.MALE;break;
                                case 'female': lecturer.Gender = Genders.FEMALE;break;
                                default: lecturer.Gender = Genders.NOTKNOWN;break;
                            }
                            var lecturerAdded = self._applicationDbContext.addLecturer(lecturer);
                        }
                    },
                    function(status) {
                        console.log(status);
                    }
                );

            } else {
                // Update a lecturer
                var id = this._applicationDbContext.getLecturers()[0].Id;
                var lecturer = this._applicationDbContext.getLecturerById(id);
                if(lecturer != null) {
                    lecturer.FirstName = 'Olivia';
                    var result = this._applicationDbContext.updateLecturer(lecturer);
                    console.log(result);
                }

                // Soft delete or undelete a lecturer
                lecturer = this._applicationDbContext.getLecturerById(id);
                if(lecturer != null) {
                    var result = (lecturer.DeletedAt == null || lecturer.DeletedAt == undefined)?this._applicationDbContext.softDeleteLecturer(lecturer.Id):this._applicationDbContext.softUnDeleteLecturer(lecturer.Id);
                    console.log(result);
                }

                // Delete a lecturer
                lecturer = this._applicationDbContext.getLecturerById(id);
                if(lecturer != null) {
                    var result = this._applicationDbContext.deleteLecturer(lecturer.Id)
                    console.log(result);
                }
            }

        }
    };
    App.init();
});