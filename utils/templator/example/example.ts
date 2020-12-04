
import Templator from '../templator.js'
import {SIMPLE_TEMPLATE} from "./block.tmpl.js";
import {SIMPLE_CONTEXT} from "./block.tmpl.js";

const tmpl = new Templator(SIMPLE_TEMPLATE);
const renderedTemplate = tmpl.compile(SIMPLE_CONTEXT); // Строка с html-версткой

// Можно кликать на блоки и смотреть, что выводится в консоль
document.body.innerHTML = renderedTemplate;
