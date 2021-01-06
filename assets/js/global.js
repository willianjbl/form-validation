let form = document.querySelector('.validator');

let validator = {
    handleSubmit: (event) => {
        event.preventDefault();
        let submit = true;
        let inputs = form.querySelectorAll('input');

        validator.clearErrors();

        inputs.forEach(input => {
            let check = validator.checkInput(input);
            
            if (check.error) {
                submit = false;
                validator.showError(input, check);
            }
        });

        if (submit) {
            form.submit();
        }
    },
    checkInput: (input) => {
        let rules = input.dataset.rules;
        let error = {error: true, message: "", type: "error"};

        if (rules) {
            rules = rules.split('|');

            for (let i in rules) {
                let rule = rules[i].split('=');

                switch (rule[0]) {
                    case 'required':
                        if (!input.value) {
                            error.message = 'O campo não pode ser vazio.';
                            return error;
                        }
                        break;
                    case 'minLength':
                        if (input.value.length < rule[1]) {
                            error.message = `O campo precisa conter no mínimo ${rule[1]} caracteres`;
                            error.type = 'warning'
                            return error;
                        }
                        break;
                    case 'email':
                        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
                        if (!regex.test(input.value.toLowerCase())) {
                            error.message = 'O e-mail informado não é válido.';
                            return error;
                        }
                        break;
                }
            }
        }
        return {error: false, message: "Formulário validado!", type: 'success'};
    },
    showError: (input, error) => {
        input.style.border = '3px solid #F00';

        let errorEl = document.createElement('div');
        errorEl.classList.add('error-msg');
        errorEl.classList.add(error.type);
        errorEl.innerHTML = error.message;

        input.parentElement.insertBefore(errorEl, input.elementSibling);
    },
    clearErrors: () => {
        let errorEl = document.querySelectorAll('.error-msg');
        let inputs = form.querySelectorAll('input');

        inputs.forEach(input => {
            input.style = '';
        });

        errorEl.forEach(el => {
            el.remove();
        });
    }
};

form.addEventListener('submit', validator.handleSubmit);
