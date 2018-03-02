webpackJsonp([3],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__test_test__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_sqlite_db_sqlite_db__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_services_dialog__ = __webpack_require__(82);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Generated class for the ProfileListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ProfileListPage = (function () {
    function ProfileListPage(navParams, loadingController, platform, sql, navCtrl, http, dialog) {
        this.navParams = navParams;
        this.loadingController = loadingController;
        this.platform = platform;
        this.sql = sql;
        this.navCtrl = navCtrl;
        this.http = http;
        this.dialog = dialog;
        this.storedtest = [];
        this.user_id = null;
        this.loader = null;
        this.companyId = this.navParams.get('companyId');
        console.log("comapny Id", this.companyId);
    }
    ProfileListPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        if (this.platform.is('ios')) {
            this.loader = this.loadingController.create({
                content: "Please Wait..",
                showBackdrop: true,
                spinner: 'ios'
            });
        }
        if (this.platform.is('android')) {
            this.loader = this.loadingController.create({
                content: "Please Wait..",
                showBackdrop: true,
                spinner: 'dots'
            });
        }
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        this.tabBarElement.style.display = 'flex';
        console.log("ionViewDidEnter");
        if (typeof (localStorage.getItem("userLoggedIn")) != "undefined" && localStorage.getItem("userLoggedIn") != "false" && localStorage.getItem("userLoggedIn") != null) {
            this.loader.present().then(function () {
                _this.load();
            }).catch(function (errloader) {
                console.log(errloader.code);
            });
        }
    };
    ProfileListPage.prototype.ionViewWillEnter = function () {
        if (typeof (localStorage.getItem("userLoggedIn")) == "undefined" || localStorage.getItem("userLoggedIn") == "false" || localStorage.getItem("userLoggedIn") == null) {
            // this.navCtrl.push(LoginPage,{},()=>{console.log("displayed")});
            // this.app.getRootNav().push(LoginPage);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
            console.log("willEnter called");
        }
        console.log(localStorage.getItem("userLoggedIn"));
    };
    ProfileListPage.prototype.load = function () {
        var _this = this;
        console.log("Load called");
        var link = 'https://test.anytimelearn.in/maPages/getEnabledProfileIonic.php';
        var data = JSON.stringify({ simID: localStorage.getItem("deviceId"), companyProfile: this.companyId });
        this.sql.dbcreate('AnytimeLearn', ["CREATE TABLE IF NOT EXISTS assessment(ED TEXT, Name TEXT, Questions TEXT,TI TEXT PRIMARY KEY,TQ TEXT,TS TEXT)", []], function () { });
        this.sql.dbcreate('AnytimeLearn', ["CREATE TABLE IF NOT EXISTS submitresults(TI TEXT PRIMARY KEY,LINK VARCHAR(200),RESULTS VARCHAR(1000),RESPONSE VARCHAR(1000) DEFAULT -1)", []], function () { });
        this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            // this.data.response = data.json;
            _this.posts = data;
            console.log(data);
            _this.loader.dismiss();
        }, function (error) {
            _this.loader.dismiss();
            console.log("Oooops!" + error);
            _this.query = "Select * from assessment";
            _this.temppost = _this.posts;
            _this.posts = [];
            _this.sql.dbcreate('AnytimeLearn', [_this.query, []], function (data) {
                for (var i = 0; i < data.rows.length; i++) {
                    _this.storedtest.push(data.rows.item(i).Name);
                }
                for (var i = 0; i < _this.temppost.length; i++) {
                    if (_this.storedtest.indexOf(_this.temppost[i]["c_cn"]) != -1)
                        _this.posts.push(_this.temppost[i]);
                }
                console.log(_this.posts);
            });
        });
    };
    ProfileListPage.prototype.loadTest = function (postTest) {
        var _this = this;
        if (postTest.c_nA == "1")
            this.dialog.displayDialog("Enter User Id", "", "Submit", "", function (text) {
                _this.user_id = text;
                if (text == "" || text.toString().match(/^[a-z0-9]+$/i) == null)
                    _this.dialog.dialogs.alert("Enter a valid User ID");
                else {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__test_test__["a" /* TestPage */], {
                        "courseId": postTest.c_id,
                        "course_Name": postTest.c_cn,
                        "user_id": text
                    });
                }
            });
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__test_test__["a" /* TestPage */], {
                "courseId": postTest.c_id,
                "course_Name": postTest.c_cn,
                "user_id": null
            });
        }
    };
    return ProfileListPage;
}());
ProfileListPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-profile-list',template:/*ion-inline-start:"C:\atl_ionic_app\atl_ionic_app\src\pages\profile-list\profile-list.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>My Courses</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content>\n	<ion-item *ngFor="let post of posts">\n	<ion-card (click)="loadTest(post)">\n		<ion-card-header>\n			{{post.c_cn}}\n		</ion-card-header>\n	</ion-card>\n	</ion-item>\n</ion-content>\n'/*ion-inline-end:"C:\atl_ionic_app\atl_ionic_app\src\pages\profile-list\profile-list.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_6__providers_sqlite_db_sqlite_db__["a" /* SqliteDbProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_7__providers_services_dialog__["a" /* DialogProvider */]])
], ProfileListPage);

//# sourceMappingURL=profile-list.js.map

/***/ }),

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_services_toast__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_sqlite_db_sqlite_db__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the TestPage page.
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var TestPage = (function () {
    function TestPage(platform, loadingController, sql, toast, navCtrl, navParams, http) {
        this.platform = platform;
        this.loadingController = loadingController;
        this.sql = sql;
        this.toast = toast;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.index = 0;
        this.currentPage = 1;
        this.answers = [];
        this.runtime = 0;
        this.multiselect_options = [];
        this.answer_multi = [];
        this.resultJSON = new Array();
        this.quesNum = 0;
        this.totalPages = 0;
        if (platform.is('ios')) {
            this.loader = this.loadingController.create({
                content: "Please Wait..",
                showBackdrop: true,
                spinner: 'ios'
            });
        }
        if (platform.is('android')) {
            this.loader = this.loadingController.create({
                content: "Please Wait..",
                showBackdrop: true,
                spinner: 'dots'
            });
        }
        if (typeof (localStorage.getItem("deviceId")) != 'undefined')
            this.device_id = localStorage.getItem("deviceId");
        else
            this.device_id = null;
    }
    TestPage.prototype.ngOnDestroy = function () {
        console.log("On Destory called on test.ts");
        clearInterval(this.task);
    };
    TestPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // works like intent gets the dats from course listing page 
        this.course_id = this.navParams.get('courseId');
        this.course_name = this.navParams.get('course_Name');
        this.user_id = this.navParams.get("user_id");
        console.log('ionViewDidLoad TestPage');
        //this.getTestAttributes(this.course_id);
        this.loader.present().then(function () {
            _this.getQuestion(_this.course_id, _this.quesNum);
            document.getElementById('loadnext').style.display = '';
            document.getElementById('submit').style.display = 'none';
        });
        clearInterval(this.task);
        this.task = setInterval(function () {
            _this.timeleft = _this.refreshData();
        }, 1000);
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        this.tabBarElement.style.display = 'none';
    };
    TestPage.prototype.refreshData = function () {
        this.runtime += 1000;
        var millisec = this.runtime;
        var hour, minutes, seconds;
        if (millisec >= 3600000) {
            hour = '00' + Math.floor(millisec / (60 * 60 * 1000));
            millisec = millisec - (hour * 60 * 60 * 1000);
        }
        else
            hour = '00' + 0;
        if (millisec >= 60000) {
            minutes = '00' + Math.floor(millisec / (60 * 1000));
            millisec = millisec - (minutes * 60 * 1000);
        }
        else
            minutes = '00' + 0;
        if (millisec >= 1000) {
            seconds = '00' + Math.floor(millisec / 1000);
        }
        else
            seconds = '00' + 0;
        hour = hour.substr(hour.length - 2, hour.length - 1);
        minutes = minutes.substr(minutes.length - 2, minutes.length - 1);
        seconds = seconds.substr(seconds.length - 2, seconds.length - 1);
        return hour + ':' + minutes + ':' + seconds;
    };
    //get the question for temp, will move to provider page later
    TestPage.prototype.getQuestion = function (id, pageNo) {
        var _this = this;
        console.log(this.device_id);
        var link = 'https://test.anytimelearn.in/maPages/getTestAttribAndQuestionsIonic.php';
        var data = JSON.stringify({ CourseId: id, SimId: this.device_id });
        console.log(data);
        this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            // this.data.response = data;
            _this.query = '  Insert OR Replace into assessment(ED,Name,Questions,TI,TQ,TS) Values(?,?,?,?,?,?)';
            _this.sql.dbcreate('AnytimeLearn', [_this.query, [data.list.ED, data.list.Name, JSON.stringify(data.list.Questions), data.list.TI, data.list.TQ, data.list.TS]], function () { });
            _this.displayDbData(id);
            console.log(data);
        }, function (error) {
            console.log("Oooops!" + error);
            _this.toast.showToast("Offline");
            _this.displayDbData(id);
        });
    };
    TestPage.prototype.displayDbData = function (id) {
        var _this = this;
        this.query = "Select * from assessment WHERE TI='" + id + "'";
        this.sql.dbcreate('AnytimeLearn', [this.query, []], function (data) {
            _this.resultdata = data.rows;
            for (var i = 0; i < _this.resultdata.item.length; i++) {
                console.log(_this.resultdata.item(i));
                try {
                    _this.resultdata.item(i).Questions = JSON.parse(_this.resultdata.item(i).Questions);
                }
                catch (err) {
                    _this.toast.showToast("Connection not available");
                    _this.ngOnDestroy();
                    _this.navCtrl.popToRoot();
                }
                _this.test_id = _this.resultdata.item(i).TI;
                _this.getQuesnList = _this.resultdata.item(i).Questions;
                _this.showCheckbox = _this.getQuesnList[_this.quesNum].rAns.split(",").length;
                console.log("length", _this.showCheckbox);
                _this.getQuesn = _this.getQuesnList[_this.quesNum].quen;
                _this.getOptn = _this.getQuesnList[_this.quesNum].optn;
                _this.totalPages = _this.getQuesnList.length;
                if (i == _this.resultdata.item.length - 1) {
                    for (var i = 0; i < _this.totalPages; i++)
                        _this.answers.push(-1);
                    console.log(data);
                }
            }
            _this.loader.dismiss();
        });
    };
    TestPage.prototype.getTestAttributes = function (id) {
        var link = 'https://test.anytimelearn.in/maPages/getTestAttributesIonic.php';
        var data = JSON.stringify({ CourseId: id, SimId: this.device_id });
        this.http.post(link, data)
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            // this.data.response = data;
            //   console.log(data.expl);           
        }, function (error) {
            console.log("Oooops!" + error);
        });
    };
    TestPage.prototype.submit = function () {
        var _this = this;
        this.answers[this.quesNum] = this.answer;
        console.log(this.answers);
        var answerArray = new Array();
        for (var i = 0; i < this.totalPages; i++) {
            if (this.answers[i] != -1 && !Array.isArray(this.answers[i]))
                this.answers[i] = Number(this.answers[i]) + 1;
            if (this.answers[i] != -1 && Array.isArray(this.answers[i])) {
                this.answers[i] = this.answers[i].map(function (val, k) {
                    return Number(val) + 1;
                });
            }
            answerArray.push({
                "SeqNo": i,
                "PageNo": this.getQuesnList[i]["pageNum"],
                "Answer": Array.isArray(this.answers[i]) ? this.answers[i].join(":") : this.answers[i]
            });
        }
        this.resultJSON.push({
            "SimId": this.device_id,
            "CourseId": this.course_id,
            "UserId": this.user_id,
            "AnswerList": answerArray
        });
        console.log(this.resultJSON);
        console.log(JSON.stringify(this.answers));
        var link = "https://test.anytimelearn.in/maPages/takeExamAnswersWithUserIdPost.php";
        if (this.platform.is('ios')) {
            this.loader = this.loadingController.create({
                content: "Please Wait..",
                showBackdrop: true,
                spinner: 'ios'
            });
        }
        if (this.platform.is('android')) {
            this.loader = this.loadingController.create({
                content: "Please Wait..",
                showBackdrop: true,
                spinner: 'dots'
            });
        }
        this.loader.present().then(function () {
            _this.http.post(link, JSON.stringify(_this.resultJSON))
                .subscribe(function (data) {
                console.log(data);
                if (data["_body"] == "Success") {
                    _this.query = '  Insert OR Replace into submitresults(TI,LINK,RESULTS,RESPONSE) Values(?,?,?,?)';
                    _this.sql.dbcreate('AnytimeLearn', [_this.query, [_this.test_id, link, JSON.stringify(_this.resultJSON), data["_body"]]], function () {
                        _this.navCtrl.pop();
                    });
                }
                else {
                    if (data["_body"] == "ERROR") {
                        _this.toast.showToast("User not enrolled for test");
                        _this.query = '  Insert OR Replace into submitresults(TI,LINK,RESULTS,RESPONSE) Values(?,?,?,?)';
                        _this.sql.dbcreate('AnytimeLearn', [_this.query, [_this.test_id, link, JSON.stringify(_this.resultJSON), "-1"]], function () {
                            _this.loader.dismiss();
                            _this.toast.showToast("Something went wrong.Restart the app");
                            _this.navCtrl.pop();
                        });
                    }
                    if (data["_body"] == "ERROR_INVALID") {
                        _this.toast.showToast("User not enrolled for test");
                        _this.loader.dismiss();
                        _this.navCtrl.pop();
                    }
                }
            }, function (error) {
                _this.loader.dismiss();
                _this.toast.showToast("Something went wrong.Contact Admin");
                console.log("Oooops!" + error);
                _this.query = '  Insert OR Replace into submitresults(TI,LINK,RESULTS,RESPONSE) Values(?,?,?,?)';
                _this.sql.dbcreate('AnytimeLearn', [_this.query, [_this.test_id, link, JSON.stringify(_this.resultJSON), "-1"]], function () {
                    _this.navCtrl.pop();
                });
            });
        });
    };
    //load next question
    TestPage.prototype.loadNextQuestion = function () {
        console.log(this.answer);
        if (this.answer == undefined)
            this.answer = -1;
        this.getQuesnList[this.quesNum].rAns.split(",").length;
        if (this.quesNum != this.totalPages - 1) {
            if (this.getQuesnList[this.quesNum].rAns.split(",").length > 1)
                this.answer = this.multiselect_options;
            this.answers[this.quesNum] = this.answer;
            console.log("before ++", this.answer);
            this.quesNum++;
            this.currentPage++;
            this.multiselect_options = [];
            this.showCheckbox = this.getQuesnList[this.quesNum].rAns.split(",").length;
            console.log(this.answer);
            console.log(this.answers);
            this.getQuesn = this.getQuesnList[this.quesNum].quen;
            this.getOptn = this.getQuesnList[this.quesNum].optn;
            this.answer = this.answers[this.quesNum];
            console.log("after ++", this.answer);
            if (Array.isArray(this.answer))
                this.multiselect_options = this.answer;
        }
        if (this.quesNum == this.totalPages - 1) {
            document.getElementById('submit').style.display = '';
            document.getElementById('loadnext').style.display = 'none';
        }
    };
    TestPage.prototype.multiselect = function (event) {
        if (this.multiselect_options.indexOf(event) != -1)
            this.multiselect_options.splice(this.multiselect_options.indexOf(event), 1);
        else
            this.multiselect_options.push(event);
        console.log(this.multiselect_options);
        console.log(this.answer);
    };
    //load previous question  
    TestPage.prototype.isChecked = function (val) {
        //   console.log("checking if is checked");
        if (this.multiselect_options.indexOf(val) != -1)
            return true;
        else
            return false;
    };
    TestPage.prototype.loadPreQuestion = function () {
        if (this.quesNum == 0)
            this.toast.showToast("You've reached the first question");
        if (this.quesNum == this.totalPages - 1) {
            this.answers[this.quesNum] = this.answer;
        }
        if (this.quesNum > 0) {
            document.getElementById('loadnext').style.display = '';
            document.getElementById('submit').style.display = 'none';
            console.log("before --", this.answer);
            this.quesNum--;
            this.currentPage--;
            this.showCheckbox = this.getQuesnList[this.quesNum].rAns.split(",").length;
            this.answer = this.answers[this.quesNum];
            console.log("after --", this.answer);
            if (this.getQuesnList[this.quesNum].rAns.split(",").length > 1)
                this.multiselect_options = this.answer;
            this.getQuesn = this.getQuesnList[this.quesNum].quen;
            this.getOptn = this.getQuesnList[this.quesNum].optn;
        }
    };
    return TestPage;
}());
TestPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-test',template:/*ion-inline-start:"C:\atl_ionic_app\atl_ionic_app\src\pages\test\test.html"*/'<ion-header>\n	<ion-navbar>\n		<ion-title>{{course_name}}</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content padding>\n		<div align=\'right\' style="font-size:18px;font-weight: bolder;">&nbsp;<span style="float:left;">{{currentPage}}/{{totalPages}}</span><span style="float:right;"><ion-icon name="alarm"></ion-icon>&nbsp;{{timeleft}}</span></div>		\n	<ion-card >\n		<ion-card-header style="white-space: normal;">\n			{{getQuesn}}\n		</ion-card-header>\n	</ion-card>\n	<ion-list radio-group [(ngModel)]="answer" selected> \n		<div  *ngFor="let options of getOptn ; let i = index ">\n			<ion-item *ngIf="showCheckbox==1">\n				<ion-label>{{options.option}}</ion-label>\n				<ion-radio id=\'radioAll\'  value="{{i}}"  ></ion-radio>\n			</ion-item>\n			<ion-item *ngIf="showCheckbox>1">\n					<ion-label>{{options.option}}</ion-label>\n				<ion-checkbox id="checkboxAll" [checked]="isChecked(i)" (ionChange)="multiselect(i)"></ion-checkbox>\n			</ion-item>\n		</div>\n	</ion-list>\n	<div ng-app="MyApplication" ng-controller="MyController">\n		<div ng-repeat="item in items track by $index" ng-show="$index == indexToShow">\n		{{item}}\n		</div>\n	</div>\n	<ion-footer>\n		<ion-toolbar>	\n			<ion-list>\n				<ion-item>\n					<button ion-button color="danger" icon-left (click)="loadPreQuestion()">\n						<ion-icon name="arrow-dropleft"></ion-icon>\n						Previous \n					</button>\n					<button  id=\'loadnext\' ion-button color="danger" icon-right (click)="loadNextQuestion()">\n						Next\n						<ion-icon name="arrow-dropright"></ion-icon>\n					</button>\n					<button  id=\'submit\' ion-button color="primary" icon-right (click)="submit()">\n						Submit\n						<ion-icon name="arrow-dropright"></ion-icon>\n					</button>\n					</ion-item>\n			</ion-list>\n		</ion-toolbar>\n	</ion-footer>\n</ion-content>'/*ion-inline-end:"C:\atl_ionic_app\atl_ionic_app\src\pages\test\test.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_5__providers_sqlite_db_sqlite_db__["a" /* SqliteDbProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_services_toast__["a" /* Toastservice */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
], TestPage);

//# sourceMappingURL=test.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Toastservice; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var Toastservice = (function () {
    function Toastservice(toastCtrl) {
        this.toastCtrl = toastCtrl;
        console.log('toast called');
    }
    Toastservice.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Toast closed');
        });
        toast.dismissAll();
        toast.present();
    };
    return Toastservice;
}());
Toastservice = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* ToastController */]])
], Toastservice);

//# sourceMappingURL=toast.js.map

/***/ }),

/***/ 116:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 116;

/***/ }),

/***/ 158:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/login/login.module": [
		276,
		2
	],
	"../pages/profile-list/profile-list.module": [
		277,
		1
	],
	"../pages/test/test.module": [
		278,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 158;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__about_about__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact_contact__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(206);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__about_about__["a" /* AboutPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__contact_contact__["a" /* ContactPage */];
    }
    return TabsPage;
}());
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\atl_ionic_app\atl_ionic_app\src\pages\tabs\tabs.html"*/'<ion-tabs id=\'tabs\'>\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Contact" tabIcon="contacts"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"C:\atl_ionic_app\atl_ionic_app\src\pages\tabs\tabs.html"*/
    }),
    __metadata("design:paramtypes", [])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutPage = (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    return AboutPage;
}());
AboutPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-about',template:/*ion-inline-start:"C:\atl_ionic_app\atl_ionic_app\src\pages\about\about.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      About\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"C:\atl_ionic_app\atl_ionic_app\src\pages\about\about.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
], AboutPage);

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactPage = (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    return ContactPage;
}());
ContactPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-contact',template:/*ion-inline-start:"C:\atl_ionic_app\atl_ionic_app\src\pages\contact\contact.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Contact\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list>\n    <ion-list-header>Follow us on Twitter</ion-list-header>\n    <ion-item>\n      <ion-icon name="ionic" item-left></ion-icon>\n      @ionicframework\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"C:\atl_ionic_app\atl_ionic_app\src\pages\contact\contact.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */]])
], ContactPage);

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_profile_list_profile_list__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_login_login__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_services_services__ = __webpack_require__(207);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var HomePage = (function () {
    function HomePage(platform, http, loadingController, navCtrl, services) {
        this.platform = platform;
        this.http = http;
        this.loadingController = loadingController;
        this.navCtrl = navCtrl;
        this.services = services;
        this.displayProfiles = new Array();
        clearInterval(this.interval);
        this.interval = setInterval(this.services.httpBackgorundResultPost(), 10000);
        //remember to put the below along with present else not displayed aftr tab change
    }
    HomePage.prototype.ionViewWillEnter = function () {
        console.log("Ion view will enter");
        if (typeof (localStorage.getItem("userLoggedIn")) == "undefined" || localStorage.getItem("userLoggedIn") == "false" || localStorage.getItem("userLoggedIn") == null) {
            // this.navCtrl.push(LoginPage,{},()=>{console.log("displayed")});
            // this.app.getRootNav().push(LoginPage);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_login_login__["a" /* LoginPage */]);
            console.log("willEnter called");
        }
    };
    HomePage.prototype.load = function () {
        var _this = this;
        this.displayProfiles = new Array();
        var link = "https://test.anytimelearn.in/maPages/profileListPost.php";
        this.http.post(link, JSON.stringify({ simId: localStorage.getItem("deviceId") }))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log(data);
            _this.profiles = data;
            if (typeof (_this.profiles) != "undefined") {
                _this.loader.dismiss();
                for (var i = 0; i < _this.profiles.profileList.length; i++) {
                    _this.profiles.profileList[i]["image"] = _this.profiles.url + _this.profiles.profileList[i].company_id + ".png";
                    _this.displayProfiles.push(_this.profiles.profileList[i]);
                }
                console.log(_this.displayProfiles);
            }
        }, function (error) {
            console.log("Ooops Error in getting profiles");
        });
    };
    HomePage.prototype.submit = function (companyId) {
        console.log(companyId);
        if (typeof (companyId) != "undefined" || companyId != null)
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_profile_list_profile_list__["a" /* ProfileListPage */], {
                "companyId": companyId
            });
    };
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        if (this.platform.is('ios')) {
            this.loader = this.loadingController.create({
                content: "Please Wait..",
                showBackdrop: true,
                spinner: 'ios'
            });
        }
        if (this.platform.is('android')) {
            this.loader = this.loadingController.create({
                content: "Please Wait..",
                showBackdrop: true,
                spinner: 'dots'
            });
        }
        console.log("Ion view did enter");
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        this.tabBarElement.style.display = 'flex';
        if (typeof (localStorage.getItem("userLoggedIn")) != "undefined" && localStorage.getItem("userLoggedIn") != "false" && localStorage.getItem("userLoggedIn") != null) {
            this.loader.present().then(function () {
                _this.load();
            }).catch(function (errloader) {
                console.log(errloader.code);
            });
        }
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\atl_ionic_app\atl_ionic_app\src\pages\home\home.html"*/'<ion-header>\n	<ion-navbar color="primary">\n		<ion-title>Profiles</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content style="background-color: lightslategray;">\n	<ion-grid>\n		<ion-row> \n			<ion-col *ngFor="let profile of displayProfiles" col-6>\n					<ion-card style="box-shadow: 7px 7px 3px darkslategray;" (click)="submit(profile.company_id)">\n								<ion-card-header style="min-height:120px;max-height:120px;white-space: normal;">\n								<img src="{{profile.image}}" alt="Image" onerror="this.src=\'assets/imgs/atlicon.png\';">\n								</ion-card-header>\n								<ion-card-content style="min-height:30px;max-height:30px;margin-bottom:3%;">\n										<h5 style="text-align:center;padding-bottom:2%;font-family:\'Times New Roman\', Times, serif;">{{profile.company_name}}</h5>\n								</ion-card-content>\n							</ion-card>\n				</ion-col>\n			</ion-row>\n	</ion-grid>\n</ion-content>\n'/*ion-inline-end:"C:\atl_ionic_app\atl_ionic_app\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_6__providers_services_services__["a" /* ServicesProvider */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServicesProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sqlite_db_sqlite_db__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ServicesProvider = (function () {
    function ServicesProvider(http, sqlite) {
        this.http = http;
        this.sqlite = sqlite;
        console.log('Hello ServicesProvider Provider');
    }
    ServicesProvider.prototype.httpBackgorundResultPost = function () {
        var _this = this;
        this.sqlite.dbcreate('AnytimeLearn', ["Select * from submitresults where RESPONSE='-1'", []], function (data) {
            _this.resultdata = data.rows;
            for (var i = 0; i < _this.resultdata.item.length; i++) {
                console.log("from services", _this.resultdata.item(i));
                _this.http.post(_this.resultdata.item(i).LINK, _this.resultdata.item(i).RESULTS).subscribe(function (data) {
                    console.log(data);
                    if (data["_body"] == "Success") {
                        _this.query = '  Insert OR Replace into submitresults(TI,LINK,RESULTS,RESPONSE) Values(?,?,?,?)';
                        _this.sqlite.dbcreate('AnytimeLearn', [_this.query, [_this.resultdata.item(i).TI, _this.resultdata.item(i).LINK, _this.resultdata.item(i).RESULTS, data["_body"]]], function () {
                        });
                    }
                    else {
                        console.log(data);
                        _this.query = '  Insert OR Replace into submitresults(TI,LINK,RESULTS,RESPONSE) Values(?,?,?,?)';
                        _this.sqlite.dbcreate('AnytimeLearn', [_this.query, [_this.resultdata.item(i).TI, _this.resultdata.item(i).LINK, _this.resultdata.item(i).RESULTS, "-1"]], function () {
                        });
                    }
                }, function (error) {
                    console.log("Ooops error");
                    _this.query = '  Insert OR Replace into submitresults(TI,LINK,RESULTS,RESPONSE) Values(?,?,?,?)';
                    _this.sqlite.dbcreate('AnytimeLearn', [_this.query, [_this.resultdata.item(i).TI, _this.resultdata.item(i).LINK, _this.resultdata.item(i).RESULTS, "-1"]], function () {
                    });
                });
            }
        });
    };
    return ServicesProvider;
}());
ServicesProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__providers_sqlite_db_sqlite_db__["a" /* SqliteDbProvider */]])
], ServicesProvider);

//# sourceMappingURL=services.js.map

/***/ }),

/***/ 208:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(227);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_about_about__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_test_test__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_services_services__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_sqlite_db_sqlite_db__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_sqlite__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_services_toast__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__providers_services_dialog__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_dialogs__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_unique_device_id__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_login_login__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_profile_list_profile_list__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_profile_list_profile_list__["a" /* ProfileListPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_test_test__["a" /* TestPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_login_login__["a" /* LoginPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                links: [
                    { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/profile-list/profile-list.module#ProfileListPageModule', name: 'ProfileListPage', segment: 'profile-list', priority: 'low', defaultHistory: [] },
                    { loadChildren: '../pages/test/test.module#TestPageModule', name: 'TestPage', segment: 'test', priority: 'low', defaultHistory: [] }
                ]
            })
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_profile_list_profile_list__["a" /* ProfileListPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_test_test__["a" /* TestPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_unique_device_id__["a" /* UniqueDeviceID */],
            __WEBPACK_IMPORTED_MODULE_15__providers_services_toast__["a" /* Toastservice */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_11__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_12__providers_services_services__["a" /* ServicesProvider */],
            __WEBPACK_IMPORTED_MODULE_13__providers_sqlite_db_sqlite_db__["a" /* SqliteDbProvider */],
            __WEBPACK_IMPORTED_MODULE_16__providers_services_dialog__["a" /* DialogProvider */],
            __WEBPACK_IMPORTED_MODULE_14__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_17__ionic_native_dialogs__["a" /* Dialogs */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(203);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\atl_ionic_app\atl_ionic_app\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"C:\atl_ionic_app\atl_ionic_app\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SqliteDbProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_sqlite__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the SqliteDbProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var SqliteDbProvider = (function () {
    function SqliteDbProvider(sqlite) {
        this.sqlite = sqlite;
    }
    SqliteDbProvider.prototype.dbcreate = function (dbname, query, callback) {
        this.sqlite.create({
            name: dbname + '.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql(query[0], query[1]).then(function (data) { console.log("SQL exec successfull", data); callback(data); })
                .catch(function (e) { return console.log(e); });
        }).catch(function (e) { return console.log(e); });
    };
    return SqliteDbProvider;
}());
SqliteDbProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_sqlite__["a" /* SQLite */]])
], SqliteDbProvider);

//# sourceMappingURL=sqlite-db.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_unique_device_id__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_services_dialog__ = __webpack_require__(82);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(dialog, app, deviceId, http, navCtrl, navParams) {
        this.dialog = dialog;
        this.app = app;
        this.deviceId = deviceId;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.phoneNumber_wrong = true;
        this.email_wrong = true;
        this.disable_signin = false;
        this.typesOfUsers = ["I'm a Student", "I'm a employee", "I'm a general user"];
        console.log("constructor");
    }
    LoginPage.prototype.submitCompanyData = function (val) {
        var _this = this;
        console.log(val);
        var link = 'https://test.anytimelearn.in/maPages/deviceRegistrationIonic.php';
        var dataGen = {
            simId: localStorage.getItem("deviceId"),
            emailId: "",
            ownPhone: "",
            companyUniqueId: 0,
            company_id: this.company_id
        };
        switch (Number(val)) {
            case 1:
                if (this.email_wrong != true && this.phoneNumber_wrong != true) {
                    dataGen.emailId = this.username;
                    dataGen.ownPhone = this.phoneNumber;
                }
                else
                    return;
                break;
            case 2:
                if (this.phoneNumber_wrong != true) {
                    dataGen.emailId = this.phoneNumber + "@" + this.company_id;
                    dataGen.ownPhone = this.phoneNumber;
                }
                else
                    return;
                break;
            case 3:
                if (this.phoneNumber_wrong != true) {
                    dataGen.emailId = this.username + "@" + this.company_id;
                    dataGen.ownPhone = this.phoneNumber;
                }
                else
                    return;
                break;
            case 4:
                if (this.phoneNumber_wrong != true) {
                    dataGen.emailId = this.username + "@" + this.company_id;
                    dataGen.ownPhone = this.phoneNumber;
                }
                else
                    return;
                break;
        }
        this.deviceId.get()
            .then(function (Id) {
            localStorage.setItem("deviceId", Id);
            dataGen.simId = Id;
            var data = JSON.stringify(dataGen);
            console.log(dataGen);
            _this.http.post(link, data)
                .subscribe(function (data) {
                console.log(data);
                if (data["_body"] == "Success") {
                    localStorage.setItem("userLoggedIn", "true");
                    _this.navCtrl.pop();
                }
                _this.username = '';
                _this.phoneNumber = '';
            }, function (error) {
                console.log("Oooops!" + error);
                localStorage.setItem("userLoggedIn", "false");
                _this.username = '';
                _this.phoneNumber = '';
            });
        })
            .catch(function (err) { return console.log("Error getting deviceId"); });
    };
    LoginPage.prototype.radioChangeHandler = function (event) {
        var _this = this;
        console.log(event);
        switch (Number(event)) {
            case 0:
                document.getElementById('displayList').style.display = 'none';
                document.getElementById('SignIn').style.display = '';
                break;
            case 1:
                this.dialog.displayConfirm('Do you have an Company ID', 'Message', ["Yes", "No"], function (clicked) {
                    switch (Number(clicked)) {
                        case 0:
                            break;
                        case 1:
                            _this.setDisplayForm('EmployeeSignIn');
                            break;
                        case 2:
                            break;
                    }
                    console.log("Confirm completed");
                });
                break;
            case 2:
                document.getElementById('displayList').style.display = 'none';
                document.getElementById('SignInUser').style.display = '';
                break;
        }
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
        document.getElementById('SignIn').style.display = 'none';
        document.getElementById('SignInUser').style.display = 'none';
        document.getElementById("EmployeeSignIn").style.display = 'none';
        document.getElementById("CompanySignIn1").style.display = 'none';
        document.getElementById("CompanySignIn2").style.display = 'none';
        document.getElementById("CompanySignIn3").style.display = 'none';
        document.getElementById("CompanySignIn4").style.display = 'none';
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
        this.tabBarElement.style.display = 'none';
    };
    LoginPage.prototype.submit = function (val) {
        var _this = this;
        switch (Number(val)) {
            case 0:
            case 1:
                if (this.email_wrong != true && this.phoneNumber_wrong != true) {
                    var link = 'https://test.anytimelearn.in/maPages/deviceRegistrationIonic.php';
                    this.deviceId.get()
                        .then(function (Id) {
                        localStorage.setItem("deviceId", Id);
                        var data = JSON.stringify({
                            simId: localStorage.getItem("deviceId"),
                            emailId: _this.username,
                            ownPhone: _this.phoneNumber,
                            companyUniqueId: 0,
                            company_id: 0
                        });
                        console.log(data);
                        _this.http.post(link, data)
                            .subscribe(function (data) {
                            if (data["_body"] == "Success") {
                                localStorage.setItem("userLoggedIn", "true");
                                _this.navCtrl.pop();
                            }
                            _this.username = '';
                            _this.phoneNumber = '';
                        }, function (error) {
                            console.log("Oooops!" + error);
                            localStorage.setItem("userLoggedIn", "false");
                            _this.username = '';
                            _this.phoneNumber = '';
                        });
                    })
                        .catch(function (err) { return console.log("Error getting deviceId"); });
                }
                break;
            case 2:
                console.log("username", this.username);
                if (this.username != " " || typeof (this.username) != null) {
                    console.log("exec started");
                    var link = 'https://test.anytimelearn.in/maPages/getRegistrationFiledsIonic.php';
                    this.company_id = this.username;
                    var data = JSON.stringify({
                        companyId: this.username
                    });
                    this.http.post(link, data)
                        .subscribe(function (data) {
                        console.log("exec", data);
                        _this.setDisplayForm("CompanySignIn" + data["_body"]);
                        _this.username = '';
                        _this.phoneNumber = '';
                    }, function (error) {
                        console.log("Oooops!" + error);
                        _this.username = '';
                        _this.phoneNumber = '';
                    });
                }
                break;
        }
    };
    LoginPage.prototype.usernamecheck = function (val) {
        switch (Number(val)) {
            case 0:
                if (!this.username.match(/[a-z0-9]+[@]{1}[a-z0-9]+[.]{1}[a-z0-9]+/i)) {
                    document.getElementById('emailid').style.borderColor = "red";
                    this.email_wrong = true;
                }
                else {
                    document.getElementById('emailid').style.borderColor = "white";
                    this.email_wrong = false;
                }
                break;
            case 1:
                if (!this.phoneNumber.match(/^[0-9]{10}$/)) {
                    this.phoneNumber_wrong = true;
                    document.getElementById('pass_doc').style.borderColor = "red";
                }
                else {
                    document.getElementById('pass_doc').style.borderColor = "white";
                    this.phoneNumber_wrong = false;
                }
                break;
        }
    };
    LoginPage.prototype.setDisplayForm = function (val) {
        if (val == "displayList") {
            console.log("SignIN");
            document.getElementById("SignIn").style.display = 'none';
            document.getElementById("displayList").style.display = '';
            document.getElementById("EmployeeSignIn").style.display = 'none';
            document.getElementById("CompanySignIn1").style.display = 'none';
            document.getElementById("CompanySignIn2").style.display = 'none';
            document.getElementById("CompanySignIn3").style.display = 'none';
            document.getElementById("CompanySignIn4").style.display = 'none';
            this.disable_signin = true;
        }
        else if (val == "displayListUser") {
            console.log("SignINUser");
            document.getElementById("SignInUser").style.display = 'none';
            document.getElementById("displayList").style.display = '';
            document.getElementById("EmployeeSignIn").style.display = 'none';
            document.getElementById("CompanySignIn1").style.display = 'none';
            document.getElementById("CompanySignIn2").style.display = 'none';
            document.getElementById("CompanySignIn3").style.display = 'none';
            document.getElementById("CompanySignIn4").style.display = 'none';
            this.disable_signin = true;
        }
        else if (val == "EmployeeSignIn") {
            document.getElementById("SignInUser").style.display = 'none';
            document.getElementById("displayList").style.display = 'none';
            document.getElementById("EmployeeSignIn").style.display = '';
            document.getElementById("CompanySignIn1").style.display = 'none';
            document.getElementById("CompanySignIn2").style.display = 'none';
            document.getElementById("CompanySignIn3").style.display = 'none';
            document.getElementById("CompanySignIn4").style.display = 'none';
        }
        else if (val == "CompanySignIn1") {
            document.getElementById("SignInUser").style.display = 'none';
            document.getElementById("displayList").style.display = 'none';
            document.getElementById("EmployeeSignIn").style.display = 'none';
            document.getElementById("CompanySignIn1").style.display = '';
            document.getElementById("CompanySignIn2").style.display = 'none';
            document.getElementById("CompanySignIn3").style.display = 'none';
            document.getElementById("CompanySignIn4").style.display = 'none';
        }
        else if (val == "CompanySignIn2") {
            document.getElementById("SignInUser").style.display = 'none';
            document.getElementById("displayList").style.display = 'none';
            document.getElementById("EmployeeSignIn").style.display = 'none';
            document.getElementById("CompanySignIn1").style.display = 'none';
            document.getElementById("CompanySignIn2").style.display = '';
            document.getElementById("CompanySignIn3").style.display = 'none';
            document.getElementById("CompanySignIn4").style.display = 'none';
        }
        else if (val == "CompanySignIn3") {
            document.getElementById("SignInUser").style.display = 'none';
            document.getElementById("displayList").style.display = 'none';
            document.getElementById("EmployeeSignIn").style.display = 'none';
            document.getElementById("CompanySignIn1").style.display = 'none';
            document.getElementById("CompanySignIn2").style.display = 'none';
            document.getElementById("CompanySignIn3").style.display = '';
            document.getElementById("CompanySignIn4").style.display = 'none';
        }
        else if (val == "CompanySignIn4") {
            document.getElementById("SignInUser").style.display = 'none';
            document.getElementById("displayList").style.display = 'none';
            document.getElementById("EmployeeSignIn").style.display = 'none';
            document.getElementById("CompanySignIn1").style.display = 'none';
            document.getElementById("CompanySignIn2").style.display = 'none';
            document.getElementById("CompanySignIn3").style.display = 'none';
            document.getElementById("CompanySignIn4").style.display = '';
        }
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"C:\atl_ionic_app\atl_ionic_app\src\pages\login\login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header >\n  \n    <ion-navbar  hideBackButton="true" color="danger" >\n      <ion-title text-center style="font-size: 30px;">Anytime Learn</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content style="background-color:#ffffff;" padding>    \n    <div text-center style="margin-top:10%;">\n    <img src="assets/imgs/atlicon.png" alt="AnytimeLearn logo"  width=50% height=50%>\n    <h1 style="color:#ffa726;font-size:30px;font-family:Summit;font-style:normal;"><b><span style="color:black">A</span>ny<span style="color:black"> T</span>ime<span style="color:black"> L</span>earn</b></h1>\n    </div>\n<div id="displayList" style="bottom: 0.5%;\nposition: absolute;margin-top:5%;\nwidth: 90%;">\n    <ion-list radio-group (ionChange)="radioChangeHandler($event)" > \n     \n      <div  *ngFor="let options of typesOfUsers ; let i = index ">\n          <br />\n        <ion-item style="background-color:#ffa726;" >\n          <ion-label >{{options}}</ion-label>\n          <ion-radio id=\'radioAll\'  value="{{i}}"  ></ion-radio>\n        </ion-item>\n      </div>\n    </ion-list>\n  </div>\n  <form style="bottom: 0.5%;\n  position: absolute;margin-top:5%;\n  width: 90%;" id="SignIn" disabled="disable_signin"  (ngSubmit)="submit(0)">\n    <div text-center  style="background-color:#ffa726;">\n      <ion-input id="emailid" [(ngModel)]="username" style="border:1px solid white;color:darkslategray;background-color:white;" type="email" name="username" placeholder="Enter Email" (ionChange)="usernamecheck(0)" required ></ion-input>\n      <ion-input id="pass_doc" [(ngModel)]="phoneNumber" style="border:1px solid white;margin-top:1%;color:darkslategray;background-color:white;" type="number" name="phoneNumber" placeholder="Enter Phone Number" (ionChange)="usernamecheck(1)" required ></ion-input>\n    </div>\n    <button  type="submit" style="margin-top:5%;" ion-button block style="background-color:#ffa726;">Register</button>\n    <h5 text-center style="margin-top:5%;font-style:normal; font-family:\'Franklin Gothic Medium\', \'Arial Narrow\', Arial, sans-serif; color:#f64f31;text-decoration:underline;" (click)="setDisplayForm(\'displayList\')">Not a student?</h5>\n  </form>\n  <form style="bottom: 0.5%;\n  position: absolute;margin-top:5%; \n  width: 90%;" id="SignInUser" disabled="disable_signin"  (ngSubmit)="submit(1)">\n    <div text-center  style="background-color:#ffa726;">\n      <ion-input id="emailid" [(ngModel)]="username" style="border:1px solid white;color:darkslategray;background-color:white;" type="email" name="username" placeholder="Enter Email" (ionChange)="usernamecheck(0)" required ></ion-input>\n      <ion-input id="pass_doc" [(ngModel)]="phoneNumber" style="border:1px solid white;margin-top:1%;color:darkslategray;background-color:white;" type="number" name="phoneNumber" placeholder="Enter Phone Number" (ionChange)="usernamecheck(1)" required ></ion-input>\n    </div>\n    <button  type="submit" style="margin-top:5%;" ion-button block style="background-color:#ffa726;">Register</button>\n    <h5 text-center style="margin-top:5%;font-style:normal; font-family:\'Franklin Gothic Medium\', \'Arial Narrow\', Arial, sans-serif; color:#f64f31;text-decoration:underline;" (click)="setDisplayForm(\'displayListUser\')">Not a General User?</h5>\n  </form>\n  <form style="bottom: 0.5%;\n  position: absolute;margin-top:5%;\n  width: 90%;" id="EmployeeSignIn" disabled="disable_signin"  (ngSubmit)="submit(2)">\n    <div text-center  style="background-color:#ffa726;">\n      <ion-input id="emailid" [(ngModel)]="username" style="border:1px solid white;color:darkslategray;background-color:white;" type="text" name="username" placeholder="Enter Company Id" required ></ion-input>\n    </div>\n    <button  type="submit" style="margin-top:5%;" ion-button block style="background-color:#ffa726;">Proceed</button>\n    <h5 text-center style="margin-top:5%;font-style:normal; font-family:\'Franklin Gothic Medium\', \'Arial Narrow\', Arial, sans-serif; color:#f64f31;text-decoration:underline;" (click)="setDisplayForm(\'displayList\')">Not a employee?</h5>\n  </form>\n  <form style="bottom: 0.5%;\n  position: absolute;margin-top:5%;\n  width: 90%;" id="CompanySignIn3" disabled="disable_signin"  (ngSubmit)="submitCompanyData(3)">\n    <div text-center  style="background-color:#ffa726;">\n      <ion-input id="emailid"  [(ngModel)]="username" style="border:1px solid white;color:darkslategray;background-color:white;" type="text" name="username" placeholder="Enter Employee Id" required ></ion-input>\n      <ion-input id="pass_doc" [(ngModel)]="phoneNumber" style="border:1px solid white;margin-top:1%;color:darkslategray;background-color:white;" type="number" name="phoneNumber" placeholder="Enter Phone Number" (ionChange)="usernamecheck(1)" required ></ion-input>  \n    </div>\n    <button  type="submit" style="margin-top:5%;" ion-button block style="background-color:#ffa726;">Proceed</button>\n    <h5 text-center style="margin-top:5%;font-style:normal; font-family:\'Franklin Gothic Medium\', \'Arial Narrow\', Arial, sans-serif; color:#f64f31;text-decoration:underline;" (click)="setDisplayForm(\'displayList\')">Not a employee?</h5>\n  </form>\n  <form style="bottom: 0.5%;\n  position: absolute;margin-top:5%;\n  width: 90%;" id="CompanySignIn2" disabled="disable_signin"  (ngSubmit)="submitCompanyData(2)">\n    <div text-center  style="background-color:#ffa726;">\n      <ion-input id="pass_doc" [(ngModel)]="phoneNumber" style="border:1px solid white;margin-top:1%;color:darkslategray;background-color:white;" type="number" name="phoneNumber" placeholder="Enter Phone Number" (ionChange)="usernamecheck(1)" required ></ion-input>  \n    </div>\n    <button  type="submit" style="margin-top:5%;" ion-button block style="background-color:#ffa726;">Proceed</button>\n    <h5 text-center style="margin-top:5%;font-style:normal; font-family:\'Franklin Gothic Medium\', \'Arial Narrow\', Arial, sans-serif; color:#f64f31;text-decoration:underline;" (click)="setDisplayForm(\'displayList\')">Not a employee?</h5>\n  </form>\n  <form style="bottom: 0.5%;\n  position: absolute;margin-top:5%;\n  width: 90%;" id="CompanySignIn1" disabled="disable_signin"  (ngSubmit)="submitCompanyData(1)">\n    <div text-center  style="background-color:#ffa726;">\n      <ion-input id="emailid"  [(ngModel)]="username" style="border:1px solid white;color:darkslategray;background-color:white;" type="text" name="username" (ionChange)="usernamecheck(0)" placeholder="Enter email Id" required ></ion-input>\n      <ion-input id="pass_doc" [(ngModel)]="phoneNumber" style="border:1px solid white;margin-top:1%;color:darkslategray;background-color:white;" type="number" name="phoneNumber" placeholder="Enter Phone Number" (ionChange)="usernamecheck(1)" required ></ion-input>  \n    </div>\n    <button  type="submit" style="margin-top:5%;" ion-button block style="background-color:#ffa726;">Proceed</button>\n    <h5 text-center style="margin-top:5%;font-style:normal; font-family:\'Franklin Gothic Medium\', \'Arial Narrow\', Arial, sans-serif; color:#f64f31;text-decoration:underline;" (click)="setDisplayForm(\'displayList\')">Not a employee?</h5>\n  </form>\n  <form style="bottom: 0.5%;\n  position: absolute;margin-top:5%;\n  width: 90%;" id="CompanySignIn4" disabled="disable_signin"  (ngSubmit)="submitCompanyData(4)">\n    <div text-center  style="background-color:#ffa726;">\n      <ion-input id="emailid"  [(ngModel)]="username" style="border:1px solid white;color:darkslategray;background-color:white;" type="text" name="username" placeholder="Enter Login Id" required ></ion-input>\n      <ion-input id="pass_doc" [(ngModel)]="phoneNumber" style="border:1px solid white;margin-top:1%;color:darkslategray;background-color:white;" type="number" name="phoneNumber" placeholder="Enter Phone Number" (ionChange)="usernamecheck(1)" required ></ion-input>  \n    </div>\n    <button  type="submit" style="margin-top:5%;" ion-button block style="background-color:#ffa726;">Proceed</button>\n    <h5 text-center style="margin-top:5%;font-style:normal; font-family:\'Franklin Gothic Medium\', \'Arial Narrow\', Arial, sans-serif; color:#f64f31;text-decoration:underline;" (click)="setDisplayForm(\'displayList\')">Not a employee?</h5>\n  </form>\n</ion-content>\n  '/*ion-inline-end:"C:\atl_ionic_app\atl_ionic_app\src\pages\login\login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_services_dialog__["a" /* DialogProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_unique_device_id__["a" /* UniqueDeviceID */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_native_dialogs__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DialogProvider = (function () {
    function DialogProvider(dialogs) {
        this.dialogs = dialogs;
    }
    DialogProvider.prototype.displayDialog = function (message, title, buttonLabel, hint, callback) {
        this.dialogs.prompt(message, title, buttonLabel, hint)
            .then(function (text) { console.log("Dialog executed", text); callback(text.input1); })
            .catch(function (err) { console.log("Dialog error"); });
    };
    DialogProvider.prototype.displayConfirm = function (message, title, buttonLabel, callback) {
        this.dialogs.confirm(message, title, buttonLabel)
            .then(function (clickedOption) {
            console.log('Clicked is', clickedOption);
            callback(clickedOption);
        })
            .catch(function (err) { console.log("Error occured in confirm"); });
    };
    return DialogProvider;
}());
DialogProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__ionic_native_dialogs__["a" /* Dialogs */]])
], DialogProvider);

//# sourceMappingURL=dialog.js.map

/***/ })

},[208]);
//# sourceMappingURL=main.js.map