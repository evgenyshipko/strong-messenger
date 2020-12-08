/* global HTMLFormElement */
var Name;
(function (Name) {
    Name["PASSWORD"] = "password";
    Name["LOGIN"] = "login";
    Name["EMAIL"] = "email";
    Name["FIRST_NAME"] = "first_name";
    Name["SECOND_NAME"] = "second_name";
    Name["PHONE"] = "phone";
    Name["SECOND_PASSWORD"] = "second-password";
    Name["OLD_PASSWORD"] = "oldPassword";
    Name["NEW_PASSWORD"] = "newPassword";
    Name["NEW_PASSWORD_REPEAT"] = "newPasswordRepeat";
})(Name || (Name = {}));
class FormValidator {
    constructor(form) {
        this.form = form;
    }
    validate() {
        const formData = new FormData(this.form);
        for (const pair of formData.entries()) {
            const inputName = pair[0];
            const value = pair[1];
            try {
                this._checkEmptiness(inputName, value);
                this._validate(inputName, value);
                this._disableMessage(inputName);
            }
            catch (e) {
                const message = e.message;
                this._showMessage(inputName, message);
            }
            console.log(pair[0] + ': ' + pair[1]);
        }
    }
    _showMessage(inputName, message) {
        var _a, _b;
        const input = this.form.querySelector(`[name='${inputName}']`);
        if (input) {
            const spanExisting = (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('span')[0];
            if (spanExisting) {
                spanExisting.style.display = 'block';
                spanExisting.textContent = message;
            }
            else {
                const span = document.createElement('span');
                span.textContent = message;
                (_b = input.parentElement) === null || _b === void 0 ? void 0 : _b.appendChild(span);
            }
        }
    }
    _disableMessage(inputName) {
        var _a;
        const input = this.form.querySelector(`[name='${inputName}']`);
        const spanExisting = (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('span')[0];
        if (spanExisting) {
            spanExisting.style.display = 'none';
        }
    }
    _checkEmptiness(inputName, value) {
        if (value.length === 0) {
            throw new Error(`Необходимо ввести ${inputName}`);
        }
    }
    _validate(inputName, value) {
        switch (inputName) {
            case Name.PASSWORD:
                return this._validatePassword(value);
            case Name.LOGIN:
                return this._validateLogin(value);
        }
    }
    _validatePassword(value) {
        const passLength = 8;
        if (value.length < passLength) {
            throw new Error(`Минимальная длина пароля ${passLength} символа`);
        }
    }
    _validateLogin(value) {
        const logLength = 3;
        if (value.length < logLength) {
            throw new Error(`Минимальная длина логина ${logLength} символа`);
        }
    }
}
export default FormValidator;
//# sourceMappingURL=FormValidator.js.map
