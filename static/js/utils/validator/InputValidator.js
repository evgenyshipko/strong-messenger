/* global HTMLInputElement */
export var InputName;
(function (InputName) {
    InputName["PASSWORD"] = "password";
    InputName["LOGIN"] = "login";
    InputName["EMAIL"] = "email";
    InputName["FIRST_NAME"] = "first_name";
    InputName["LAST_NAME"] = "last_name";
    InputName["SECOND_NAME"] = "second_name";
    InputName["PHONE"] = "phone";
    InputName["SECOND_PASSWORD"] = "second-password";
    InputName["OLD_PASSWORD"] = "oldPassword";
    InputName["NEW_PASSWORD"] = "newPassword";
    InputName["NEW_PASSWORD_REPEAT"] = "newPasswordRepeat";
})(InputName || (InputName = {}));
class InputValidator {
    constructor(input) {
        this.input = input;
    }
    validate() {
        const inputDisplayName = this._getInputDisplayName();
        const inputName = this.input.getAttribute('name');
        const value = this.input.value;
        try {
            this._checkEmptiness(inputDisplayName, value);
            this._validate(inputName, inputDisplayName, value);
            this.disableMessage();
        }
        catch (e) {
            this._showMessage(e.message);
        }
    }
    _getInputDisplayName() {
        const placeholder = this.input.getAttribute('placeholder');
        if (placeholder) {
            return placeholder;
        }
        const parent = this.input.parentElement;
        if (parent) {
            const wrapper = parent.parentElement;
            if (wrapper) {
                const label = wrapper.getElementsByTagName('label')[0];
                if (label) {
                    return label.textContent;
                }
            }
        }
    }
    _showMessage(message) {
        var _a, _b;
        const spanExisting = (_a = this.input.parentElement) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('span')[0];
        if (spanExisting) {
            spanExisting.style.display = 'block';
            spanExisting.textContent = message;
        }
        else {
            const span = document.createElement('span');
            span.textContent = message;
            span.classList.add('form-input-validation-message');
            (_b = this.input.parentElement) === null || _b === void 0 ? void 0 : _b.appendChild(span);
        }
    }
    disableMessage() {
        var _a;
        const spanExisting = (_a = this.input.parentElement) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('span')[0];
        if (spanExisting) {
            spanExisting.style.display = 'none';
        }
    }
    _checkEmptiness(inputDisplayName, value) {
        if (!value || value.length === 0) {
            throw new Error(`Необходимо ввести ${inputDisplayName}`);
        }
    }
    _validate(inputName, inputDisplayName, value) {
        const obj = {
            [InputName.PASSWORD]: this._validateLength(inputDisplayName, value, 8),
            [InputName.SECOND_PASSWORD]: this._validateLength(inputDisplayName, value, 8),
            [InputName.NEW_PASSWORD_REPEAT]: this._validateLength(inputDisplayName, value, 8),
            [InputName.NEW_PASSWORD]: this._validateLength(inputDisplayName, value, 8),
            [InputName.OLD_PASSWORD]: this._validateLength(inputDisplayName, value, 8),
            [InputName.LOGIN]: this._validateLength(inputDisplayName, value, 3),
            [InputName.FIRST_NAME]: this._validateLength(inputDisplayName, value, 2),
            [InputName.SECOND_NAME]: this._validateLength(inputDisplayName, value, 2),
            [InputName.LAST_NAME]: this._validateLength(inputDisplayName, value, 2),
            [InputName.EMAIL]: this._validateEmail(value),
            [InputName.PHONE]: this._validatePhone(value)
        };
        return obj[inputName]();
    }
    _validateLength(inputDisplayName, value, length) {
        return () => {
            if (value.length < length) {
                throw new Error(`Минимальная длина ввода поля "${inputDisplayName}": ${length}`);
            }
        };
    }
    _validateEmail(value) {
        // источник: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        const EMAIL_REGEXP = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const matchingResult = EMAIL_REGEXP.exec(value);
        return () => {
            if (!matchingResult || matchingResult[0].length !== value.length) {
                throw new Error('Невалидный адрес (шаблон: example@mail.com)');
            }
        };
    }
    _validatePhone(value) {
        return () => {
            const PHONE_REGEXP = /\+*(\d{1}-*\(*\)*){11,13}/;
            const matchingResult = PHONE_REGEXP.exec(value);
            if (!matchingResult || matchingResult[0].length !== value.length) {
                throw new Error('Невалидный телефон (шаблон: +7-999-999-99-99)');
            }
        };
    }
}
export default InputValidator;
//# sourceMappingURL=InputValidator.js.map