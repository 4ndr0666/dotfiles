// ==UserScript==
// @name Custom Dark Mode for app.tensorpix.ai
// @match https://app.tensorpix.ai/*
// @run-at document-start
// ==/UserScript==

var style = document.createElement('style');

// Content of your uploaded CSS file goes here
style.textContent = `
  /*/* User-Agent Style */
html {
    background-color: #181a1b !important;
}
html {
    color-scheme: dark !important;
}
html, body {
    background-color: #181a1b;
}
html, body {
    border-color: #736b5e;
    color: #e8e6e3;
}
a {
    color: #3391ff;
}
table {
    border-color: #545b5e;
}
::placeholder {
    color: #b2aba1;
}
input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill {
    background-color: #404400 !important;
    color: #e8e6e3 !important;
}
::-webkit-scrollbar {
    background-color: #202324;
    color: #aba499;
}
::-webkit-scrollbar-thumb {
    background-color: #454a4d;
}
::-webkit-scrollbar-thumb:hover {
    background-color: #575e62;
}
::-webkit-scrollbar-thumb:active {
    background-color: #484e51;
}
::-webkit-scrollbar-corner {
    background-color: #181a1b;
}
::selection {
    background-color: #004daa !important;
    color: #e8e6e3 !important;
}
::-moz-selection {
    background-color: #004daa !important;
    color: #e8e6e3 !important;
}

/* Invert Style */
.jfk-bubble.gtx-bubble, .captcheck_answer_label > input + img, span#closed_text > img[src^="https://www.gstatic.com/images/branding/googlelogo"], span[data-href^="https://www.hcaptcha.com/"] > #icon, #bit-notification-bar-iframe, ::-webkit-calendar-picker-indicator {
    filter: invert(100%) hue-rotate(180deg) contrast(90%) !important;
}

/* Variables Style */
:root {
   --darkreader-neutral-background: #131516;
   --darkreader-neutral-text: #d8d4cf;
   --darkreader-selection-background: #004daa;
   --darkreader-selection-text: #e8e6e3;
}

/* Modified CSS */
*,
::before,
::after {
    -webkit-tap-highlight-color: transparent;
}
abbr[title] {
    border-bottom-color: initial;
    text-decoration-color: initial;
}
legend {
    color: inherit;
}
.q-icon {
    fill: currentcolor;
}
.q-loading-bar {
    background-image: initial;
    background-color: rgb(169, 20, 9);
}
.q-badge {
    background-color: var(--darkreader-bg--q-primary);
    color: rgb(232, 230, 227);
}
.q-badge--outline {
    background-color: transparent;
    border-color: currentcolor;
}
.q-banner {
    background-image: initial;
    background-color: rgb(24, 26, 27);
}
.q-bar {
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.2);
}
.q-bar--dark {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.15);
}
.q-breadcrumbs__el {
    color: inherit;
}
.q-btn {
    outline-color: initial;
    border-color: initial;
    text-decoration-color: initial;
    color: inherit;
    background-image: initial;
    background-color: transparent;
}
.q-btn::before {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px,
    rgba(0, 0, 0, 0.12) 0px 3px 1px -2px;
}
.q-btn--actionable.q-btn--standard:active::before,
.q-btn--actionable.q-btn--standard.q-btn--active::before {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0px 5px 8px,
    rgba(0, 0, 0, 0.12) 0px 1px 14px;
}
.q-btn--outline {
    background-image: initial !important;
    background-color: transparent !important;
}
.q-btn--outline::before {
    border-color: currentcolor;
}
.q-btn--push::before {
    border-bottom-color: rgba(140, 130, 115, 0.15);
}
.q-btn--flat::before,
.q-btn--outline::before,
.q-btn--unelevated::before {
    box-shadow: none;
}
.q-btn__progress-indicator {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.25);
}
.q-btn__progress--dark .q-btn__progress-indicator {
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.2);
}
.q-btn--flat .q-btn__progress-indicator,
.q-btn--outline .q-btn__progress-indicator {
    background-image: initial;
    background-color: currentcolor;
}
.q-btn-dropdown--split .q-btn-dropdown__arrow-container.q-btn--outline {
    border-left-color: currentcolor;
}
.q-btn-dropdown--split .q-btn-dropdown__arrow-container:not(.q-btn--outline) {
    border-left-color: rgba(48, 52, 54, 0.3);
}
.q-btn-group {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px,
    rgba(0, 0, 0, 0.12) 0px 3px 1px -2px;
}
.q-btn-group > .q-btn-item::before {
    box-shadow: none;
}
.q-btn-group > .q-btn-group {
    box-shadow: none;
}
.q-btn-group > .q-btn-group:not(:first-child) > .q-btn:first-child::before {
    border-left-color: initial;
}
.q-btn-group > .q-btn-group:not(:last-child) > .q-btn:last-child::before {
    border-right-color: initial;
}
.q-btn-group--flat,
.q-btn-group--outline,
.q-btn-group--unelevated {
    box-shadow: none;
}
.q-btn-group--outline > .q-btn-item + .q-btn-item::before {
    border-left-color: initial;
}
.q-btn-group--outline > .q-btn-item:not(:last-child)::before {
    border-right-color: initial;
}
.q-btn-group--glossy > .q-btn-item {
    background-image: linear-gradient(rgba(24, 26, 27, 0.3),
    rgba(24, 26, 27, 0) 50%,
    rgba(0, 0, 0, 0.12) 51%,
    rgba(0, 0, 0, 0.04)) !important;
}
.q-card {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px,
    rgba(0, 0, 0, 0.12) 0px 3px 1px -2px;
    background-image: initial;
    background-color: rgb(24, 26, 27);
}
.q-card > div:first-child,
.q-card > img:first-child {
    border-top-color: initial;
}
.q-card > div:last-child,
.q-card > img:last-child {
    border-bottom-color: initial;
}
.q-card > div {
    border-left-color: initial;
    border-right-color: initial;
    box-shadow: none;
}
.q-card--bordered {
    border-color: rgba(140, 130, 115, 0.12);
}
.q-card--dark {
    border-color: rgba(48, 52, 54, 0.28);
    box-shadow: rgba(24, 26, 27, 0.2) 0px 1px 5px,
    rgba(24, 26, 27, 0.14) 0px 2px 2px,
    rgba(24, 26, 27, 0.12) 0px 3px 1px -2px;
}
.q-card__section--horiz > div {
    border-top-color: initial;
    border-bottom-color: initial;
    box-shadow: none;
}
.q-card > img {
    border-color: initial;
}
.q-carousel {
    background-color: rgb(24, 26, 27);
}
.q-carousel__control {
    color: rgb(232, 230, 227);
}
.q-carousel .q-carousel__thumbnail {
    border-color: transparent;
}
.q-carousel .q-carousel__thumbnail--active {
    border-color: currentcolor;
}
.q-message-stamp {
    color: inherit;
}
.q-message-text--received {
    color: rgb(131, 200, 134);
}
.q-message-text--received:last-child::before {
    border-right-color: transparent;
    border-left-color: transparent;
    border-bottom-color: currentcolor;
}
.q-message-text-content--received {
    color: rgb(232, 230, 227);
}
.q-message-text--sent {
    color: rgb(212, 209, 203);
}
.q-message-text--sent:last-child::before {
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: currentcolor;
}
.q-message-text-content--sent {
    color: rgb(232, 230, 227);
}
.q-message-text {
    background-image: initial;
    background-color: currentcolor;
}
.q-checkbox__bg {
    border-color: currentcolor;
}
.q-checkbox__icon {
    color: currentcolor;
}
.q-checkbox__svg {
    color: rgb(232, 230, 227);
}
.q-checkbox__truthy {
    stroke: currentcolor;
}
.q-checkbox__indet {
    fill: currentcolor;
}
.q-checkbox__inner {
    outline-color: initial;
    color: rgba(232, 230, 227, 0.54);
}
.q-checkbox__inner--truthy,
.q-checkbox__inner--indet {
    color: var(--darkreader-text--q-primary);
}
.q-checkbox__inner--truthy .q-checkbox__bg,
.q-checkbox__inner--indet .q-checkbox__bg {
    background-image: initial;
    background-color: currentcolor;
}
.q-checkbox--dark .q-checkbox__inner {
    color: rgba(232, 230, 227, 0.7);
}
.q-checkbox--dark .q-checkbox__inner--truthy,
.q-checkbox--dark .q-checkbox__inner--indet {
    color: var(--darkreader-text--q-primary);
}
body.desktop .q-checkbox:not(.disabled) .q-checkbox__inner::before {
    background-image: initial;
    background-color: currentcolor;
}
.q-chip {
    outline-color: initial;
    background-image: initial;
    background-color: rgb(42, 45, 47);
    color: rgba(232, 230, 227, 0.87);
}
.q-chip--colored .q-chip__icon,
.q-chip--dark .q-chip__icon {
    color: inherit;
}
.q-chip--outline {
    border-color: currentcolor;
    background-image: initial !important;
    background-color: transparent !important;
}
.q-chip__icon {
    color: rgba(232, 230, 227, 0.54);
}
.q-chip__icon--remove {
    outline-color: initial;
}
body.desktop .q-chip--clickable:focus {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px,
    rgba(0, 0, 0, 0.14) 0px 1px 1px,
    rgba(0, 0, 0, 0.12) 0px 2px 1px -1px;
}
body.desktop.body--dark .q-chip--clickable:focus {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 1px 3px,
    rgba(24, 26, 27, 0.14) 0px 1px 1px,
    rgba(24, 26, 27, 0.12) 0px 2px 1px -1px;
}
.q-color-picker {
    background-image: initial;
    background-color: rgb(24, 26, 27);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px,
    rgba(0, 0, 0, 0.12) 0px 3px 1px -2px;
}
.q-color-picker--bordered {
    border-color: rgba(140, 130, 115, 0.12);
}
.q-color-picker__header input {
    border-color: initial;
}
.q-color-picker__header .q-tab--inactive {
    background-image: linear-gradient(to top,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.15) 25%,
    rgba(0, 0, 0, 0.1));
    background-color: initial;
}
.q-color-picker__header-content {
    background-image: initial;
    background-color: rgb(24, 26, 27);
}
.q-color-picker__header-content--light {
    color: rgb(232, 230, 227);
}
.q-color-picker__header-content--dark {
    color: rgb(232, 230, 227);
}
.q-color-picker__header-content--dark .q-tab--inactive::before {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.2);
}
.q-color-picker__header-bg {
    background-color: rgb(24, 26, 27);
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iOCIgaGVpZ2h0PSI4Ij48ZGVmcz48ZmlsdGVyIGlkPSJkYXJrcmVhZGVyLWltYWdlLWZpbHRlciI+PGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAuMjQ5IC0wLjYxNCAtMC42NzIgMC4wMDAgMS4wMzUgLTAuNjQ2IDAuMjg4IC0wLjY2NCAwLjAwMCAxLjAyMCAtMC42MzYgLTAuNjA5IDAuMjUwIDAuMDAwIDAuOTk0IDAuMDAwIDAuMDAwIDAuMDAwIDEuMDAwIDAuMDAwIiAvPjwvZmlsdGVyPjwvZGVmcz48aW1hZ2Ugd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsdGVyPSJ1cmwoI2RhcmtyZWFkZXItaW1hZ2UtZmlsdGVyKSIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBZ0FBQUFJQ0FZQUFBREVENzZMQUFBQUgwbEVRVlFvVTJOa1lHQXdaa0FGWjVHNWpQUlJnT1lFVkRlQjNFQmpCUUJPWndUVnVnSUd5QUFBQUFCSlJVNUVya0pnZ2c9PSIgLz48L3N2Zz4=") !important;
}
.q-color-picker__footer .q-tab--inactive {
    background-image: linear-gradient(rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.15) 25%,
    rgba(0, 0, 0, 0.1));
    background-color: initial;
}
.q-color-picker__spectrum-white {
    background-image: linear-gradient(to right,
    rgb(24, 26, 27),
    rgba(24, 26, 27, 0));
    background-color: initial;
}
.q-color-picker__spectrum-black {
    background-image: linear-gradient(to top,
    rgb(0, 0, 0),
    rgba(0, 0, 0, 0));
    background-color: initial;
}
.q-color-picker__spectrum-circle {
    box-shadow: rgb(24, 26, 27) 0px 0px 0px 1.5px,
    rgba(0, 0, 0, 0.3) 0px 0px 1px 1px inset,
    rgba(0, 0, 0, 0.4) 0px 0px 1px 2px;
}
.q-color-picker__hue .q-slider__track {
    background-image: linear-gradient(to right,
    rgb(204, 0, 0) 0%,
    rgb(153, 153, 0) 17%,
    rgb(51, 204, 0) 33%,
    rgb(0, 204, 204) 50%,
    rgb(0, 0, 204) 67%,
    rgb(204, 0, 204) 83%,
    rgb(204, 0, 0) 100%) !important;
    background-color: initial !important;
}
.q-color-picker__alpha .q-slider__track::before {
    background-image: linear-gradient(90deg,
    rgba(24, 26, 27, 0),
    rgb(88, 95, 99));
    background-color: initial;
}
.q-color-picker__sliders .q-slider__thumb {
    color: rgb(190, 185, 176);
}
.q-color-picker__sliders .q-slider__thumb path {
    fill: transparent;
}
.q-color-picker__tune-tab input {
    border-color: rgb(57, 61, 64);
}
.q-color-picker input {
    color: inherit;
    background-image: initial;
    background-color: transparent;
    outline-color: initial;
}
.q-color-picker .q-tab--active {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 14px 3px;
}
.q-color-picker .q-tab-panels {
    background-image: inherit;
    background-color: inherit;
}
.q-color-picker--dark {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 1px 5px,
    rgba(24, 26, 27, 0.14) 0px 2px 2px,
    rgba(24, 26, 27, 0.12) 0px 3px 1px -2px;
}
.q-color-picker--dark .q-color-picker__tune-tab input {
    border-color: rgba(48, 52, 54, 0.3);
}
.q-color-picker--dark .q-slider__thumb {
    color: rgb(229, 227, 223);
}
.q-date {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px,
    rgba(0, 0, 0, 0.12) 0px 3px 1px -2px;
    background-image: initial;
    background-color: rgb(24, 26, 27);
}
.q-date--bordered {
    border-color: rgba(140, 130, 115, 0.12);
}
.q-date__header {
    color: rgb(232, 230, 227);
    background-color: var(--darkreader-bg--q-primary);
}
.q-date__content,
.q-date__main {
    outline-color: initial;
}
.q-date__header-link {
    outline-color: initial;
}
.q-date__calendar-item::after {
    border-color: transparent;
}
.q-date__range::before,
.q-date__range-from::before,
.q-date__range-to::before {
    background-color: currentcolor;
}
.q-date__edit-range::after {
    border-color: currentcolor transparent;
}
.q-date__edit-range-from::after,
.q-date__edit-range-from-to::after {
    border-left-color: currentcolor;
    border-top-color: currentcolor;
    border-bottom-color: currentcolor;
}
.q-date__edit-range-to::after,
.q-date__edit-range-from-to::after {
    border-right-color: currentcolor;
    border-top-color: currentcolor;
    border-bottom-color: currentcolor;
}
.q-date__event {
    background-color: var(--darkreader-bg--q-secondary);
}
.q-date__today {
}
.q-date--dark {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 1px 5px,
    rgba(24, 26, 27, 0.14) 0px 2px 2px,
    rgba(24, 26, 27, 0.12) 0px 3px 1px -2px;
    border-color: rgba(48, 52, 54, 0.28);
}
.q-dialog__inner {
    outline-color: initial;
}
.q-dialog__backdrop {
    outline-color: initial;
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.4);
}
.q-editor {
    border-color: rgba(140, 130, 115, 0.12);
    background-color: rgb(24, 26, 27);
}
.q-editor__content {
    outline-color: initial;
}
.q-editor__content hr {
    border-color: initial;
    outline-color: initial;
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.12);
}
.q-editor__toolbar {
    border-bottom-color: rgba(140, 130, 115, 0.12);
}
.q-editor__toolbar-group + .q-editor__toolbar-group::before {
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.12);
}
.q-editor__link-input {
    color: inherit;
    text-decoration-color: initial;
    border-color: initial;
    background-image: none;
    background-color: initial;
    outline-color: initial;
}
.q-editor--flat,
.q-editor--flat .q-editor__toolbar {
    border-color: initial;
}
.q-editor--dark {
    border-color: rgba(48, 52, 54, 0.28);
}
.q-editor--dark .q-editor__content hr {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.28);
}
.q-editor--dark .q-editor__toolbar {
    border-color: rgba(48, 52, 54, 0.28);
}
.q-editor--dark .q-editor__toolbar-group + .q-editor__toolbar-group::before {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.28);
}
.q-expansion-item--popup > .q-expansion-item__container {
    border-color: rgba(140, 130, 115, 0.12);
}
.q-expansion-item__content > .q-card {
    box-shadow: none;
}
.q-field__marginal {
    color: rgba(232, 230, 227, 0.54);
}
.q-field__bottom {
    color: rgba(232, 230, 227, 0.54);
}
.q-field__control {
    color: var(--darkreader-text--q-primary);
    outline-color: initial;
}
.q-field__native,
.q-field__prefix,
.q-field__suffix,
.q-field__input {
    text-decoration-color: inherit;
    border-color: initial;
    background-image: none;
    background-color: initial;
    color: rgba(232, 230, 227, 0.87);
    outline-color: initial;
}
.q-field__native,
.q-field__input {
    outline-color: initial !important;
}
.q-field__native:invalid,
.q-field__input:invalid {
    box-shadow: none;
}
.q-field--disabled .q-field__control > div,
.q-field--disabled .q-field__control > div * {
    outline-color: initial !important;
}
.q-field__label {
    color: rgba(232, 230, 227, 0.6);
    text-decoration-color: inherit;
}
.q-field--highlighted .q-field__label {
    color: currentcolor;
}
.q-field--filled .q-field__control {
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.05);
}
.q-field--filled .q-field__control::before {
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.05);
    border-bottom-color: rgba(140, 130, 115, 0.42);
}
.q-field--filled .q-field__control::after {
    background-image: initial;
    background-color: currentcolor;
}
.q-field--filled.q-field--highlighted .q-field__control::before {
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.12);
}
.q-field--filled.q-field--dark .q-field__control,
.q-field--filled.q-field--dark .q-field__control::before {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.07);
}
.q-field--filled.q-field--dark.q-field--highlighted .q-field__control::before {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.1);
}
.q-field--filled.q-field--readonly .q-field__control::before {
    background-image: initial;
    background-color: transparent;
}
.q-field--outlined .q-field__control::before {
    border-color: rgba(140, 130, 115, 0.24);
}
.q-field--outlined .q-field__control:hover::before {
    border-color: rgb(140, 130, 115);
}
.q-field--outlined .q-field__control::after {
    border-color: transparent;
}
.q-field--outlined.q-field--highlighted .q-field__control:hover::before {
    border-color: transparent;
}
.q-field--outlined.q-field--highlighted .q-field__control::after {
    border-color: currentcolor;
}
.q-field--standard .q-field__control::before {
    border-bottom-color: rgba(140, 130, 115, 0.24);
}
.q-field--standard .q-field__control:hover::before {
    border-color: rgb(140, 130, 115);
}
.q-field--standard .q-field__control::after {
    background-image: initial;
    background-color: currentcolor;
}
.q-field--dark .q-field__control::before {
    border-color: rgba(48, 52, 54, 0.6);
}
.q-field--dark .q-field__control:hover::before {
    border-color: rgb(48, 52, 54);
}
.q-field--dark .q-field__native,
.q-field--dark .q-field__prefix,
.q-field--dark .q-field__suffix,
.q-field--dark .q-field__input {
    color: rgb(232, 230, 227);
}
.q-field--dark:not(.q-field--highlighted) .q-field__label,
.q-field--dark .q-field__marginal,
.q-field--dark .q-field__bottom {
    color: rgba(232, 230, 227, 0.7);
}
.q-field--standout .q-field__control {
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.05);
}
.q-field--standout .q-field__control::before {
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.07);
}
.q-field--standout.q-field--highlighted .q-field__control {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px,
    rgba(0, 0, 0, 0.12) 0px 3px 1px -2px;
    background-image: initial;
    background-color: rgb(0, 0, 0);
}
.q-field--standout.q-field--highlighted .q-field__native,
.q-field--standout.q-field--highlighted .q-field__prefix,
.q-field--standout.q-field--highlighted .q-field__suffix,
.q-field--standout.q-field--highlighted .q-field__prepend,
.q-field--standout.q-field--highlighted .q-field__append,
.q-field--standout.q-field--highlighted .q-field__input {
    color: rgb(232, 230, 227);
}
.q-field--standout.q-field--readonly .q-field__control::before {
    background-image: initial;
    background-color: transparent;
    border-color: rgba(140, 130, 115, 0.24);
}
.q-field--standout.q-field--dark .q-field__control {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.07);
}
.q-field--standout.q-field--dark .q-field__control::before {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.07);
}
.q-field--standout.q-field--dark.q-field--highlighted .q-field__control {
    background-image: initial;
    background-color: rgb(24, 26, 27);
}
.q-field--standout.q-field--dark.q-field--highlighted .q-field__native,
.q-field--standout.q-field--dark.q-field--highlighted .q-field__prefix,
.q-field--standout.q-field--dark.q-field--highlighted .q-field__suffix,
.q-field--standout.q-field--dark.q-field--highlighted .q-field__prepend,
.q-field--standout.q-field--dark.q-field--highlighted .q-field__append,
.q-field--standout.q-field--dark.q-field--highlighted .q-field__input {
    color: rgb(232, 230, 227);
}
.q-field--standout.q-field--dark.q-field--readonly .q-field__control::before {
    border-color: rgba(48, 52, 54, 0.24);
}
.q-field--labeled:not(.q-field--float) .q-field__native::placeholder,
.q-field--labeled:not(.q-field--float) .q-field__input::placeholder {
    color: transparent;
}
.q-field--error .q-field__bottom {
    color: var(--darkreader-text--q-negative);
}
.q-field__focusable-action {
    border-color: initial;
    color: inherit;
    background-image: initial;
    background-color: transparent;
    outline-color: initial !important;
}
.q-file__filler {
    border-color: initial;
}
.q-file__dnd {
    outline-color: currentcolor;
}
.q-img__content > div {
    color: rgb(232, 230, 227);
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.47);
}
.q-inner-loading {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.6);
}
.q-inner-loading--dark {
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.4);
}
.q-item {
    color: inherit;
}
.q-item__section--side {
    color: rgb(158, 150, 137);
}
.q-item__section--avatar {
    color: inherit;
}
.q-item__label--overline {
    color: rgba(232, 230, 227, 0.7);
}
.q-item__label--caption {
    color: rgba(232, 230, 227, 0.54);
}
.q-item__label--header {
    color: rgb(158, 150, 137);
}
.q-list--bordered {
    border-color: rgba(140, 130, 115, 0.12);
}
.q-list--separator > .q-item-type + .q-item-type,
.q-list--separator > .q-virtual-scroll__content > .q-item-type + .q-item-type {
    border-top-color: rgba(140, 130, 115, 0.12);
}
.q-list--dark.q-list--separator > .q-item-type + .q-item-type,
.q-list--dark.q-list--separator > .q-virtual-scroll__content > .q-item-type + .q-item-type {
    border-top-color: rgba(48, 52, 54, 0.28);
}
.q-list--dark,
.q-item--dark {
    color: rgb(232, 230, 227);
    border-color: rgba(48, 52, 54, 0.28);
}
.q-list--dark .q-item__section--side:not(.q-item__section--avatar),
.q-item--dark .q-item__section--side:not(.q-item__section--avatar) {
    color: rgba(232, 230, 227, 0.7);
}
.q-list--dark .q-item__label--header,
.q-item--dark .q-item__label--header {
    color: rgba(232, 230, 227, 0.64);
}
.q-list--dark .q-item__label--overline,
.q-list--dark .q-item__label--caption,
.q-item--dark .q-item__label--overline,
.q-item--dark .q-item__label--caption {
    color: rgba(232, 230, 227, 0.8);
}
.q-item.q-router-link--active,
.q-item--active {
    color: var(--darkreader-text--q-primary);
}
.q-knob--editable {
    outline-color: initial;
}
.q-knob--editable::before {
    box-shadow: none;
}
.q-knob--editable:focus::before {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px,
    rgba(0, 0, 0, 0.12) 0px 3px 1px -2px;
}
body.body--dark .q-knob--editable:focus::before {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 1px 5px,
    rgba(24, 26, 27, 0.14) 0px 2px 2px,
    rgba(24, 26, 27, 0.12) 0px 3px 1px -2px;
}
.q-layout {
    outline-color: initial;
}
.q-layout__shadow::after {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px 2px,
    rgba(0, 0, 0, 0.24) 0px 0px 10px;
}
.q-layout__section--marginal {
    background-color: var(--darkreader-bg--q-primary);
    color: rgb(232, 230, 227);
}
.q-header--bordered {
    border-bottom-color: rgba(140, 130, 115, 0.12);
}
.q-footer--bordered {
    border-top-color: rgba(140, 130, 115, 0.12);
}
.q-drawer {
    background-image: initial;
    background-color: rgb(24, 26, 27);
}
.q-drawer--left.q-drawer--bordered {
    border-right-color: rgba(140, 130, 115, 0.12);
}
.q-drawer--right.q-drawer--bordered {
    border-left-color: rgba(140, 130, 115, 0.12);
}
body.body--dark .q-header,
body.body--dark .q-footer,
body.body--dark .q-drawer {
    border-color: rgba(48, 52, 54, 0.28);
}
body.body--dark .q-layout__shadow::after {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 0px 10px 2px,
    rgba(24, 26, 27, 0.24) 0px 0px 10px;
}
.q-linear-progress {
    --q-linear-progress-speed: .3s;
    color: var(--darkreader-text--q-primary);
}
.q-linear-progress__model--determinate {
    background-image: initial;
    background-color: currentcolor;
}
.q-linear-progress__model--indeterminate::before,
.q-linear-progress__model--indeterminate::after,
.q-linear-progress__model--query::before,
.q-linear-progress__model--query::after {
    background-image: initial;
    background-color: currentcolor;
}
.q-linear-progress__track--light {
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.26);
}
.q-linear-progress__track--dark {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.6);
}
.q-linear-progress__stripe {
    background-image: linear-gradient(45deg,
    rgba(24, 26, 27, 0.15) 25%,
    rgba(24, 26, 27, 0) 25%,
    rgba(24, 26, 27, 0) 50%,
    rgba(24, 26, 27, 0.15) 50%,
    rgba(24, 26, 27, 0.15) 75%,
    rgba(24, 26, 27, 0) 75%,
    rgba(24, 26, 27, 0)) !important;
}
.q-menu {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px,
    rgba(0, 0, 0, 0.12) 0px 3px 1px -2px;
    background-image: initial;
    background-color: rgb(24, 26, 27);
    outline-color: initial;
}
.q-menu--dark {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 1px 5px,
    rgba(24, 26, 27, 0.14) 0px 2px 2px,
    rgba(24, 26, 27, 0.12) 0px 3px 1px -2px;
}
.q-pagination__content {
    --q-pagination-gutter-parent: -2px;
    --q-pagination-gutter-child: 2px;
}
.q-pull-to-refresh__puller {
    color: var(--darkreader-text--q-primary);
    background-image: initial;
    background-color: rgb(24, 26, 27);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0px 4px;
}
.q-radio__bg path {
    fill: currentcolor;
}
.q-radio__icon {
    color: currentcolor;
}
.q-radio__inner {
    outline-color: initial;
    color: rgba(232, 230, 227, 0.54);
}
.q-radio__inner--truthy {
    color: var(--darkreader-text--q-primary);
}
.q-radio--dark .q-radio__inner {
    color: rgba(232, 230, 227, 0.7);
}
.q-radio--dark .q-radio__inner--truthy {
    color: var(--darkreader-text--q-primary);
}
body.desktop .q-radio:not(.disabled) .q-radio__inner::before {
    background-image: initial;
    background-color: currentcolor;
}
.q-rating {
    color: rgb(255, 236, 67);
}
.q-rating__icon-container {
    outline-color: initial;
}
.q-rating__icon {
    color: currentcolor;
    text-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px,
    rgba(0, 0, 0, 0.24) 0px 1px 2px;
}
.q-scrollarea__thumb {
    background-image: initial;
    background-color: rgb(0, 0, 0);
}
.q-scrollarea--dark .q-scrollarea__thumb {
    background-image: initial;
    background-color: rgb(24, 26, 27);
}
.q-select__focus-target,
.q-select__autocomplete-input {
    border-color: initial;
    outline-color: initial !important;
}
.q-select__dialog {
    background-image: initial;
    background-color: rgb(24, 26, 27);
}
.q-select__dialog > .scroll {
    background-image: inherit;
    background-color: inherit;
}
.q-separator {
    border-color: initial;
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.12);
}
.q-separator--dark {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.28);
}
.q-skeleton {
    --q-skeleton-speed: 1.5s;
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.12);
}
.q-skeleton--bordered {
    border-color: rgba(140, 130, 115, 0.05);
}
.q-skeleton--anim-blink::after {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.7);
}
.q-skeleton--anim-wave::after {
    background-image: linear-gradient(90deg,
    rgba(24, 26, 27, 0),
    rgba(24, 26, 27, 0.5),
    rgba(24, 26, 27, 0));
    background-color: initial;
}
.q-skeleton--dark {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.05);
}
.q-skeleton--dark.q-skeleton--bordered {
    border-color: rgba(48, 52, 54, 0.25);
}
.q-skeleton--dark.q-skeleton--anim-wave::after {
    background-image: linear-gradient(90deg,
    rgba(24, 26, 27, 0),
    rgba(24, 26, 27, 0.1),
    rgba(24, 26, 27, 0));
    background-color: initial;
}
.q-skeleton--dark.q-skeleton--anim-blink::after {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.2);
}
.q-slide-item {
    background-image: initial;
    background-color: rgb(24, 26, 27);
}
.q-slide-item__left,
.q-slide-item__right,
.q-slide-item__top,
.q-slide-item__bottom {
    color: rgb(232, 230, 227);
}
.q-slide-item__left {
    background-image: initial;
    background-color: rgb(61, 140, 64);
}
.q-slide-item__right {
    background-image: initial;
    background-color: rgb(204, 122, 0);
}
.q-slide-item__top {
    background-image: initial;
    background-color: rgb(10, 106, 182);
}
.q-slide-item__bottom {
    background-image: initial;
    background-color: rgb(125, 31, 141);
}
.q-slide-item__content {
    background-image: inherit;
    background-color: inherit;
}
.q-slider__track-container {
    outline-color: initial;
}
.q-slider__track {
    color: var(--darkreader-text--q-primary);
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.1);
}
.q-slider__inner {
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.1);
}
.q-slider__selection {
    background-image: initial;
    background-color: currentcolor;
}
.q-slider__markers {
    color: rgba(232, 230, 227, 0.3);
}
.q-slider__markers::after {
    background-image: initial;
    background-color: currentcolor;
}
.q-slider__markers--h {
    background-image: repeating-linear-gradient(to right,
    currentcolor,
    currentcolor 2px,
    rgba(24, 26, 27, 0) 0px,
    rgba(24, 26, 27, 0));
}
.q-slider__markers--v {
    background-image: repeating-linear-gradient(currentcolor,
    currentcolor 2px,
    rgba(24, 26, 27, 0) 0px,
    rgba(24, 26, 27, 0));
}
.q-slider__thumb {
    outline-color: initial;
    color: var(--darkreader-text--q-primary);
}
.q-slider__thumb-shape {
    stroke: currentcolor;
}
.q-slider__thumb-shape path {
    stroke: currentcolor;
    fill: currentcolor;
}
.q-slider__pin--h::before {
    border-left-color: transparent;
    border-right-color: transparent;
}
.q-slider__pin--h-standard::before {
    border-top-color: currentcolor;
}
.q-slider__pin--h-switched::before {
    border-bottom-color: currentcolor;
}
.q-slider__pin--v::before {
    border-top-color: transparent;
    border-bottom-color: transparent;
}
.q-slider__pin--v-standard::before {
    border-right-color: currentcolor;
}
.q-slider__pin--v-switched::before {
    border-left-color: currentcolor;
}
.q-slider__text-container {
    background-image: initial;
    background-color: currentcolor;
}
.q-slider__text {
    color: rgb(232, 230, 227);
}
.q-slider--focus .q-slider__focus-ring,
body.desktop .q-slider.q-slider--editable .q-slider__track-container:hover .q-slider__focus-ring {
    background-image: initial;
    background-color: currentcolor;
}
.q-slider--dark .q-slider__track,
.q-slider--dark .q-slider__inner {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.1);
}
.q-slider--dark .q-slider__markers {
    color: rgba(232, 230, 227, 0.3);
}
.q-splitter__separator {
    background-color: rgba(0, 0, 0, 0.12);
}
.q-splitter--dark .q-splitter__separator {
    background-color: rgba(24, 26, 27, 0.28);
}
.q-stepper {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px,
    rgba(0, 0, 0, 0.12) 0px 3px 1px -2px;
    background-image: initial;
    background-color: rgb(24, 26, 27);
}
.q-stepper__dot {
    background-image: initial;
    background-color: currentcolor;
}
.q-stepper__dot span {
    color: rgb(232, 230, 227);
}
.q-stepper__tab {
    color: rgb(171, 163, 152);
}
.q-stepper--dark {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 1px 5px,
    rgba(24, 26, 27, 0.14) 0px 2px 2px,
    rgba(24, 26, 27, 0.12) 0px 3px 1px -2px;
}
.q-stepper--dark .q-stepper__dot span {
    color: rgb(232, 230, 227);
}
.q-stepper__tab--active,
.q-stepper__tab--done {
    color: var(--darkreader-text--q-primary);
}
.q-stepper__tab--active .q-stepper__dot,
.q-stepper__tab--active .q-stepper__label,
.q-stepper__tab--done .q-stepper__dot,
.q-stepper__tab--done .q-stepper__label {
}
.q-stepper__tab--disabled .q-stepper__dot {
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.22);
}
.q-stepper__tab--disabled .q-stepper__label {
    color: rgba(232, 230, 227, 0.32);
}
.q-stepper__tab--error {
    color: var(--darkreader-text--q-negative);
}
.q-stepper__tab--error-with-icon .q-stepper__dot {
    background-image: initial !important;
    background-color: transparent !important;
}
.q-stepper__tab--error-with-icon .q-stepper__dot span {
    color: currentcolor;
}
.q-stepper__header--border {
    border-bottom-color: rgba(140, 130, 115, 0.12);
}
.q-stepper--flat {
    box-shadow: none;
}
.q-stepper--bordered {
    border-color: rgba(140, 130, 115, 0.12);
}
.q-stepper--horizontal .q-stepper__line::before,
.q-stepper--horizontal .q-stepper__line::after {
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.12);
}
.q-stepper--vertical .q-stepper__dot::before,
.q-stepper--vertical .q-stepper__dot::after {
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.12);
}
.q-stepper--dark.q-stepper--bordered,
.q-stepper--dark .q-stepper__header--border {
    border-color: rgba(48, 52, 54, 0.28);
}
.q-stepper--dark.q-stepper--horizontal .q-stepper__line::before,
.q-stepper--dark.q-stepper--horizontal .q-stepper__line::after {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.28);
}
.q-stepper--dark.q-stepper--vertical .q-stepper__dot::before,
.q-stepper--dark.q-stepper--vertical .q-stepper__dot::after {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.28);
}
.q-stepper--dark .q-stepper__tab--disabled {
    color: rgba(232, 230, 227, 0.28);
}
.q-stepper--dark .q-stepper__tab--disabled .q-stepper__dot {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.28);
}
.q-stepper--dark .q-stepper__tab--disabled .q-stepper__label {
    color: rgba(232, 230, 227, 0.54);
}
.q-tab-panels {
    background-image: initial;
    background-color: rgb(24, 26, 27);
}
.q-markup-table {
    background-image: initial;
    background-color: rgb(24, 26, 27);
}
.q-table th,
.q-table td {
    background-color: inherit;
}
.q-table__card {
    color: rgb(232, 230, 227);
    background-color: rgb(24, 26, 27);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px,
    rgba(0, 0, 0, 0.12) 0px 3px 1px -2px;
}
.q-table__progress th {
    border-color: initial !important;
}
.q-table__card--dark,
.q-table--dark {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 1px 5px,
    rgba(24, 26, 27, 0.14) 0px 2px 2px,
    rgba(24, 26, 27, 0.12) 0px 3px 1px -2px;
}
.q-table--flat {
    box-shadow: none;
}
.q-table--bordered {
    border-color: rgba(140, 130, 115, 0.12);
}
.q-table--grid {
    box-shadow: none;
}
.q-table--grid .q-table__middle thead,
.q-table--grid .q-table__middle thead th {
    border-color: initial !important;
}
.q-table--grid .q-table__bottom {
    border-top-color: initial;
}
.q-table--grid.fullscreen {
    background-image: inherit;
    background-color: inherit;
}
.q-table--vertical-separator td:first-child,
.q-table--vertical-separator th:first-child,
.q-table--cell-separator td:first-child,
.q-table--cell-separator th:first-child {
    border-left-color: initial;
}
.q-table--vertical-separator .q-table__top,
.q-table--cell-separator .q-table__top {
    border-bottom-color: rgba(140, 130, 115, 0.12);
}
.q-table__bottom {
    border-top-color: rgba(140, 130, 115, 0.12);
}
.q-table thead,
.q-table tr,
.q-table th,
.q-table td {
    border-color: rgba(140, 130, 115, 0.12);
}
.q-table tbody td::before {
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.03);
}
.q-table tbody td::after {
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.06);
}
.q-table__card--dark,
.q-table--dark,
.q-table--dark .q-table__bottom,
.q-table--dark thead,
.q-table--dark tr,
.q-table--dark th,
.q-table--dark td {
    border-color: rgba(48, 52, 54, 0.28);
}
.q-table--dark tbody td::before {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.07);
}
.q-table--dark tbody td::after {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.1);
}
.q-table--dark.q-table--vertical-separator .q-table__top,
.q-table--dark.q-table--cell-separator .q-table__top {
    border-color: rgba(48, 52, 54, 0.28);
}
.q-tab {
    color: inherit;
    text-decoration-color: initial;
}
.q-tab__alert {
    background-image: initial;
    background-color: currentcolor;
}
.q-tab__indicator {
    background-image: initial;
    background-color: currentcolor;
}
.q-tabs__arrow {
    text-shadow: rgb(24, 26, 27) 0px 0px 3px,
    rgb(24, 26, 27) 0px 0px 1px,
    rgb(0, 0, 0) 0px 0px 1px;
}
.q-time {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px,
    rgba(0, 0, 0, 0.12) 0px 3px 1px -2px;
    background-image: initial;
    background-color: rgb(24, 26, 27);
    outline-color: initial;
}
.q-time--bordered {
    border-color: rgba(140, 130, 115, 0.12);
}
.q-time__header {
    color: rgb(232, 230, 227);
    background-color: var(--darkreader-bg--q-primary);
}
.q-time__link {
    outline-color: initial;
}
.q-time__container-child {
    background-image: initial;
    background-color: rgba(0, 0, 0, 0.12);
}
.q-time__clock-center {
    background-image: initial;
    background-color: currentcolor;
}
.q-time__clock-pointer {
    color: var(--darkreader-text--q-primary);
    background-image: initial;
    background-color: currentcolor;
}
.q-time__clock-pointer::before,
.q-time__clock-pointer::after {
    background-image: initial;
    background-color: currentcolor;
}
.q-time__clock-position--active {
    background-color: var(--darkreader-bg--q-primary);
    color: rgb(232, 230, 227);
}
.q-time__now-button {
    background-color: var(--darkreader-bg--q-primary);
    color: rgb(232, 230, 227);
}
.q-time--dark {
    border-color: rgba(48, 52, 54, 0.28);
    box-shadow: rgba(24, 26, 27, 0.2) 0px 1px 5px,
    rgba(24, 26, 27, 0.14) 0px 2px 2px,
    rgba(24, 26, 27, 0.12) 0px 3px 1px -2px;
}
.q-timeline {
    list-style-image: initial;
}
.q-timeline--dark {
    color: rgb(232, 230, 227);
}
.q-timeline__dot::before,
.q-timeline__dot::after {
    background-image: initial;
    background-color: currentcolor;
}
.q-timeline__dot::before {
    border-color: transparent;
}
.q-timeline__dot .q-icon {
    color: rgb(232, 230, 227);
}
.q-timeline__dot-img {
    background-image: initial;
    background-color: currentcolor;
}
.q-toggle__track {
    background-image: initial;
    background-color: currentcolor;
}
.q-toggle__thumb::after {
    background-image: initial;
    background-color: rgb(24, 26, 27);
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px,
    rgba(0, 0, 0, 0.12) 0px 1px 5px;
}
.q-toggle__thumb .q-icon {
    color: rgb(232, 230, 227);
}
.q-toggle__inner--truthy {
    color: var(--darkreader-text--q-primary);
}
.q-toggle__inner--truthy .q-toggle__thumb::after {
    background-color: currentcolor;
}
.q-toggle__inner--truthy .q-toggle__thumb .q-icon {
    color: rgb(232, 230, 227);
}
.q-toggle--dark .q-toggle__inner {
    color: rgb(232, 230, 227);
}
.q-toggle--dark .q-toggle__inner--truthy {
    color: var(--darkreader-text--q-primary);
}
.q-toggle--dark .q-toggle__thumb::after {
    box-shadow: none;
}
body.desktop .q-toggle:not(.disabled) .q-toggle__thumb::before {
    background-image: initial;
    background-color: currentcolor;
}
.q-tooltip--style {
    color: rgb(229, 227, 223);
    background-image: initial;
    background-color: rgb(88, 95, 99);
}
.q-tree {
    color: rgb(171, 163, 152);
}
.q-tree__node::after {
    border-left-color: currentcolor;
}
.q-tree__node-header::before {
    border-left-color: currentcolor;
    border-bottom-color: currentcolor;
}
.q-tree__node--parent > .q-tree__node-collapsible > .q-tree__node-body::after {
    border-left-color: currentcolor;
}
.q-tree__node-header {
    outline-color: initial;
}
.q-tree__node-header-content {
    color: rgb(232, 230, 227);
}
.q-tree__node--selected .q-tree__node-header-content {
    color: rgb(171, 163, 152);
}
.q-tree--dark .q-tree__node-header-content {
    color: rgb(232, 230, 227);
}
.q-uploader {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px,
    rgba(0, 0, 0, 0.12) 0px 3px 1px -2px;
    background-image: initial;
    background-color: rgb(24, 26, 27);
}
.q-uploader--bordered {
    border-color: rgba(140, 130, 115, 0.12);
}
.q-uploader__file::before {
    background-image: initial;
    background-color: currentcolor;
}
.q-uploader__header {
    background-color: var(--darkreader-bg--q-primary);
    color: rgb(232, 230, 227);
}
.q-uploader__dnd {
    outline-color: currentcolor;
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.6);
}
.q-uploader__overlay {
    color: rgb(232, 230, 227);
    background-color: rgba(24, 26, 27, 0.6);
}
.q-uploader__file {
    border-color: rgba(140, 130, 115, 0.12);
}
.q-uploader__file--img {
    color: rgb(232, 230, 227);
}
.q-uploader__file--img .q-circular-progress {
    color: rgb(232, 230, 227);
}
.q-uploader__file--img .q-uploader__file-header {
    background-image: linear-gradient(rgba(0, 0, 0, 0.7) 20%,
    rgba(24, 26, 27, 0));
    background-color: initial;
}
.q-uploader--dark {
    border-color: rgba(48, 52, 54, 0.28);
    box-shadow: rgba(24, 26, 27, 0.2) 0px 1px 5px,
    rgba(24, 26, 27, 0.14) 0px 2px 2px,
    rgba(24, 26, 27, 0.12) 0px 3px 1px -2px;
}
.q-uploader--dark .q-uploader__file {
    border-color: rgba(48, 52, 54, 0.28);
}
.q-uploader--dark .q-uploader__dnd,
.q-uploader--dark .q-uploader__overlay {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.3);
}
.q-uploader--dark .q-uploader__overlay {
    color: rgb(232, 230, 227);
}
.q-virtual-scroll:focus {
    outline-color: initial;
}
.q-virtual-scroll__content {
    outline-color: initial;
}
.q-virtual-scroll__padding {
    background-image: linear-gradient(rgba(24, 26, 27, 0),
    rgba(24, 26, 27, 0) 20%,
    rgba(96, 104, 108, 0.03) 20%,
    rgba(96, 104, 108, 0.08) 50%,
    rgba(96, 104, 108, 0.03) 80%,
    rgba(24, 26, 27, 0) 80%,
    rgba(24, 26, 27, 0));
    background-color: initial;
}
.q-virtual-scroll--horizontal .q-virtual-scroll__padding {
    background-image: linear-gradient(to left,
    rgba(24, 26, 27, 0),
    rgba(24, 26, 27, 0) 20%,
    rgba(96, 104, 108, 0.03) 20%,
    rgba(96, 104, 108, 0.08) 50%,
    rgba(96, 104, 108, 0.03) 80%,
    rgba(24, 26, 27, 0) 80%,
    rgba(24, 26, 27, 0));
    background-color: initial;
}
.q-ripple {
    color: inherit;
}
.q-ripple__inner {
    color: inherit;
    background-image: initial;
    background-color: currentcolor;
}
.q-loading {
    color: rgb(232, 230, 227);
}
.q-loading__backdrop {
    background-color: rgb(0, 0, 0);
}
.q-loading__box {
    color: rgb(232, 230, 227);
}
.q-notification {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px,
    rgba(0, 0, 0, 0.12) 0px 3px 1px -2px;
    background-image: initial;
    background-color: rgb(38, 41, 42);
    color: rgb(232, 230, 227);
}
.q-notification__actions {
    color: var(--darkreader-text--q-primary);
}
.q-notification__badge {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px,
    rgba(0, 0, 0, 0.14) 0px 1px 1px,
    rgba(0, 0, 0, 0.12) 0px 2px 1px -1px;
    background-color: var(--darkreader-bg--q-negative);
    color: rgb(232, 230, 227);
}
.q-notification__progress {
    background-image: initial;
    background-color: currentcolor;
}
:root {
    --animate-duration: .3s;
    --animate-delay: .3s;
    --animate-repeat: 1;
}
:root {
    --darkreader-bg--q-primary: #145ea8;
    --darkreader-text--q-primary: #53a7eb;
    --darkreader-bg--q-secondary: #1e857b;
    --darkreader-text--q-secondary: #61dbd0;
    --darkreader-bg--q-accent: #7d1f8d;
    --darkreader-text--q-accent: #c85ada;
    --darkreader-bg--q-positive: #1a9537;
    --darkreader-text--q-positive: #51e073;
    --darkreader-bg--q-negative: #9a0011;
    --darkreader-text--q-negative: #ff4559;
    --darkreader-bg--q-info: #1090aa;
    --darkreader-text--q-info: #40d0ed;
    --darkreader-bg--q-warning: #7e5e08;
    --darkreader-text--q-warning: #f3c443;
    --darkreader-bg--q-dark: #161819;
    --darkreader-text--q-dark: #d6d2cd;
    --darkreader-bg--q-dark-page: #0e0f0f;
}
.text-dark {
    color: var(--darkreader-text--q-dark) !important;
}
.bg-dark {
    background: var(--darkreader-bg--q-dark) !important;
}
.text-primary {
    color: var(--darkreader-text--q-primary) !important;
}
.bg-primary {
    background: var(--darkreader-bg--q-primary) !important;
}
.text-secondary {
    color: var(--darkreader-text--q-secondary) !important;
}
.bg-secondary {
    background: var(--darkreader-bg--q-secondary) !important;
}
.text-accent {
    color: var(--darkreader-text--q-accent) !important;
}
.bg-accent {
    background: var(--darkreader-bg--q-accent) !important;
}
.text-positive {
    color: var(--darkreader-text--q-positive) !important;
}
.bg-positive {
    background: var(--darkreader-bg--q-positive) !important;
}
.text-negative {
    color: var(--darkreader-text--q-negative) !important;
}
.bg-negative {
    background: var(--darkreader-bg--q-negative) !important;
}
.text-info {
    color: var(--darkreader-text--q-info) !important;
}
.bg-info {
    background: var(--darkreader-bg--q-info) !important;
}
.text-warning {
    color: var(--darkreader-text--q-warning) !important;
}
.bg-warning {
    background: var(--darkreader-bg--q-warning) !important;
}
.text-white {
    color: rgb(232, 230, 227) !important;
}
.bg-white {
    background-image: initial !important;
    background-color: rgb(24, 26, 27) !important;
}
.text-black {
    color: rgb(232, 230, 227) !important;
}
.bg-black {
    background-image: initial !important;
    background-color: rgb(0, 0, 0) !important;
}
.text-transparent {
    color: transparent !important;
}
.bg-transparent {
    background-image: initial !important;
    background-color: transparent !important;
}
.text-separator {
    color: rgba(232, 230, 227, 0.12) !important;
}
.bg-separator {
    background-image: initial !important;
    background-color: rgba(0, 0, 0, 0.12) !important;
}
.text-dark-separator {
    color: rgba(232, 230, 227, 0.28) !important;
}
.bg-dark-separator {
    background-image: initial !important;
    background-color: rgba(24, 26, 27, 0.28) !important;
}
.text-red {
    color: rgb(245, 78, 66) !important;
}
.text-red-1 {
    color: rgb(255, 190, 200) !important;
}
.text-red-2 {
    color: rgb(255, 169, 178) !important;
}
.text-red-3 {
    color: rgb(237, 140, 140) !important;
}
.text-red-4 {
    color: rgb(229, 114, 114) !important;
}
.text-red-5 {
    color: rgb(240, 89, 86) !important;
}
.text-red-6 {
    color: rgb(245, 78, 66) !important;
}
.text-red-7 {
    color: rgb(231, 72, 68) !important;
}
.text-red-8 {
    color: rgb(215, 67, 67) !important;
}
.text-red-9 {
    color: rgb(218, 74, 74) !important;
}
.text-red-10 {
    color: rgb(229, 83, 83) !important;
}
.text-red-11 {
    color: rgb(255, 126, 115) !important;
}
.text-red-12 {
    color: rgb(255, 83, 83) !important;
}
.text-red-13 {
    color: rgb(255, 42, 83) !important;
}
.text-red-14 {
    color: rgb(255, 55, 55) !important;
}
.text-pink {
    color: rgb(235, 51, 114) !important;
}
.text-pink-1 {
    color: rgb(248, 190, 209) !important;
}
.text-pink-2 {
    color: rgb(245, 161, 190) !important;
}
.text-pink-3 {
    color: rgb(243, 130, 168) !important;
}
.text-pink-4 {
    color: rgb(240, 99, 146) !important;
}
.text-pink-5 {
    color: rgb(237, 75, 130) !important;
}
.text-pink-6 {
    color: rgb(235, 51, 114) !important;
}
.text-pink-7 {
    color: rgb(230, 58, 121) !important;
}
.text-pink-8 {
    color: rgb(233, 74, 136) !important;
}
.text-pink-9 {
    color: rgb(236, 88, 153) !important;
}
.text-pink-10 {
    color: rgb(240, 114, 181) !important;
}
.text-pink-11 {
    color: rgb(255, 115, 162) !important;
}
.text-pink-12 {
    color: rgb(255, 70, 133) !important;
}
.text-pink-13 {
    color: rgb(255, 33, 112) !important;
}
.text-pink-14 {
    color: rgb(239, 70, 146) !important;
}
.text-purple {
    color: rgb(200, 90, 218) !important;
}
.text-purple-1 {
    color: rgb(230, 200, 234) !important;
}
.text-purple-2 {
    color: rgb(217, 172, 224) !important;
}
.text-purple-3 {
    color: rgb(204, 142, 214) !important;
}
.text-purple-4 {
    color: rgb(190, 112, 203) !important;
}
.text-purple-5 {
    color: rgb(179, 89, 194) !important;
}
.text-purple-6 {
    color: rgb(200, 90, 218) !important;
}
.text-purple-7 {
    color: rgb(194, 94, 221) !important;
}
.text-purple-8 {
    color: rgb(188, 99, 225) !important;
}
.text-purple-9 {
    color: rgb(181, 104, 228) !important;
}
.text-purple-10 {
    color: rgb(167, 112, 235) !important;
}
.text-purple-11 {
    color: rgb(232, 116, 252) !important;
}
.text-purple-12 {
    color: rgb(225, 71, 251) !important;
}
.text-purple-13 {
    color: rgb(222, 30, 255) !important;
}
.text-purple-14 {
    color: rgb(179, 26, 255) !important;
}
.text-deep-purple {
    color: rgb(129, 88, 202) !important;
}
.text-deep-purple-1 {
    color: rgb(215, 201, 235) !important;
}
.text-deep-purple-2 {
    color: rgb(194, 177, 226) !important;
}
.text-deep-purple-3 {
    color: rgb(173, 149, 216) !important;
}
.text-deep-purple-4 {
    color: rgb(152, 121, 206) !important;
}
.text-deep-purple-5 {
    color: rgb(136, 100, 199) !important;
}
.text-deep-purple-6 {
    color: rgb(129, 88, 202) !important;
}
.text-deep-purple-7 {
    color: rgb(130, 92, 206) !important;
}
.text-deep-purple-8 {
    color: rgb(131, 97, 213) !important;
}
.text-deep-purple-9 {
    color: rgb(131, 102, 218) !important;
}
.text-deep-purple-10 {
    color: rgb(132, 110, 228) !important;
}
.text-deep-purple-11 {
    color: rgb(169, 121, 255) !important;
}
.text-deep-purple-12 {
    color: rgb(126, 79, 255) !important;
}
.text-deep-purple-13 {
    color: rgb(112, 47, 255) !important;
}
.text-deep-purple-14 {
    color: rgb(130, 40, 255) !important;
}
.text-indigo {
    color: rgb(109, 149, 204) !important;
}
.text-indigo-1 {
    color: rgb(202, 216, 234) !important;
}
.text-indigo-2 {
    color: rgb(177, 197, 226) !important;
}
.text-indigo-3 {
    color: rgb(151, 178, 215) !important;
}
.text-indigo-4 {
    color: rgb(124, 158, 204) !important;
}
.text-indigo-5 {
    color: rgb(104, 143, 197) !important;
}
.text-indigo-6 {
    color: rgb(109, 149, 204) !important;
}
.text-indigo-7 {
    color: rgb(114, 153, 208) !important;
}
.text-indigo-8 {
    color: rgb(120, 159, 214) !important;
}
.text-indigo-9 {
    color: rgb(127, 165, 220) !important;
}
.text-indigo-10 {
    color: rgb(137, 174, 231) !important;
}
.text-indigo-11 {
    color: rgb(124, 179, 255) !important;
}
.text-indigo-12 {
    color: rgb(84, 156, 254) !important;
}
.text-indigo-13 {
    color: rgb(68, 147, 254) !important;
}
.text-indigo-14 {
    color: rgb(59, 141, 254) !important;
}
.text-blue {
    color: rgb(51, 162, 244) !important;
}
.text-blue-1 {
    color: rgb(188, 224, 250) !important;
}
.text-blue-2 {
    color: rgb(159, 211, 249) !important;
}
.text-blue-3 {
    color: rgb(129, 197, 248) !important;
}
.text-blue-4 {
    color: rgb(98, 183, 246) !important;
}
.text-blue-5 {
    color: rgb(74, 172, 245) !important;
}
.text-blue-6 {
    color: rgb(51, 162, 244) !important;
}
.text-blue-7 {
    color: rgb(52, 153, 232) !important;
}
.text-blue-8 {
    color: rgb(83, 167, 235) !important;
}
.text-blue-9 {
    color: rgb(94, 171, 237) !important;
}
.text-blue-10 {
    color: rgb(111, 179, 243) !important;
}
.text-blue-11 {
    color: rgb(116, 187, 255) !important;
}
.text-blue-12 {
    color: rgb(73, 165, 255) !important;
}
.text-blue-13 {
    color: rgb(54, 156, 255) !important;
}
.text-blue-14 {
    color: rgb(54, 147, 255) !important;
}
.text-light-blue {
    color: rgb(34, 184, 252) !important;
}
.text-light-blue-1 {
    color: rgb(185, 232, 253) !important;
}
.text-light-blue-2 {
    color: rgb(153, 220, 251) !important;
}
.text-light-blue-3 {
    color: rgb(118, 208, 250) !important;
}
.text-light-blue-4 {
    color: rgb(83, 196, 247) !important;
}
.text-light-blue-5 {
    color: rgb(56, 187, 247) !important;
}
.text-light-blue-6 {
    color: rgb(34, 184, 252) !important;
}
.text-light-blue-7 {
    color: rgb(44, 184, 252) !important;
}
.text-light-blue-8 {
    color: rgb(58, 184, 253) !important;
}
.text-light-blue-9 {
    color: rgb(72, 185, 253) !important;
}
.text-light-blue-10 {
    color: rgb(111, 193, 254) !important;
}
.text-light-blue-11 {
    color: rgb(115, 212, 255) !important;
}
.text-light-blue-12 {
    color: rgb(70, 198, 255) !important;
}
.text-light-blue-13 {
    color: rgb(26, 184, 255) !important;
}
.text-light-blue-14 {
    color: rgb(40, 173, 255) !important;
}
.text-cyan {
    color: rgb(56, 232, 255) !important;
}
.text-cyan-1 {
    color: rgb(189, 238, 244) !important;
}
.text-cyan-2 {
    color: rgb(157, 230, 239) !important;
}
.text-cyan-3 {
    color: rgb(122, 221, 233) !important;
}
.text-cyan-4 {
    color: rgb(87, 211, 227) !important;
}
.text-cyan-5 {
    color: rgb(60, 204, 222) !important;
}
.text-cyan-6 {
    color: rgb(56, 232, 255) !important;
}
.text-cyan-7 {
    color: rgb(69, 235, 255) !important;
}
.text-cyan-8 {
    color: rgb(87, 239, 255) !important;
}
.text-cyan-9 {
    color: rgb(104, 242, 255) !important;
}
.text-cyan-10 {
    color: rgb(200, 196, 189) !important;
}
.text-cyan-11 {
    color: rgb(118, 255, 255) !important;
}
.text-cyan-12 {
    color: rgb(42, 255, 255) !important;
}
.text-cyan-13 {
    color: rgb(26, 232, 255) !important;
}
.text-cyan-14 {
    color: rgb(56, 229, 255) !important;
}
.text-teal {
    color: rgb(99, 255, 240) !important;
}
.text-teal-1 {
    color: rgb(197, 231, 229) !important;
}
.text-teal-2 {
    color: rgb(165, 218, 213) !important;
}
.text-teal-3 {
    color: rgb(130, 204, 197) !important;
}
.text-teal-4 {
    color: rgb(94, 189, 180) !important;
}
.text-teal-5 {
    color: rgb(97, 219, 208) !important;
}
.text-teal-6 {
    color: rgb(99, 255, 240) !important;
}
.text-teal-7 {
    color: rgb(108, 255, 240) !important;
}
.text-teal-8 {
    color: rgb(119, 255, 239) !important;
}
.text-teal-9 {
    color: rgb(131, 255, 240) !important;
}
.text-teal-10 {
    color: rgb(208, 204, 197) !important;
}
.text-teal-11 {
    color: rgb(142, 255, 229) !important;
}
.text-teal-12 {
    color: rgb(96, 255, 217) !important;
}
.text-teal-13 {
    color: rgb(50, 235, 189) !important;
}
.text-teal-14 {
    color: rgb(70, 255, 230) !important;
}
.text-green {
    color: rgb(97, 186, 101) !important;
}
.text-green-1 {
    color: rgb(203, 233, 206) !important;
}
.text-green-2 {
    color: rgb(181, 222, 183) !important;
}
.text-green-3 {
    color: rgb(157, 210, 159) !important;
}
.text-green-4 {
    color: rgb(131, 200, 134) !important;
}
.text-green-5 {
    color: rgb(113, 192, 116) !important;
}
.text-green-6 {
    color: rgb(97, 186, 101) !important;
}
.text-green-7 {
    color: rgb(107, 193, 111) !important;
}
.text-green-8 {
    color: rgb(119, 201, 123) !important;
}
.text-green-9 {
    color: rgb(130, 209, 134) !important;
}
.text-green-10 {
    color: rgb(150, 225, 155) !important;
}
.text-green-11 {
    color: rgb(161, 243, 184) !important;
}
.text-green-12 {
    color: rgb(104, 240, 173) !important;
}
.text-green-13 {
    color: rgb(43, 255, 152) !important;
}
.text-green-14 {
    color: rgb(64, 255, 143) !important;
}
.text-light-green {
    color: rgb(149, 200, 90) !important;
}
.text-light-green-1 {
    color: rgb(221, 238, 201) !important;
}
.text-light-green-2 {
    color: rgb(206, 230, 178) !important;
}
.text-light-green-3 {
    color: rgb(190, 221, 154) !important;
}
.text-light-green-4 {
    color: rgb(174, 213, 129) !important;
}
.text-light-green-5 {
    color: rgb(161, 207, 109) !important;
}
.text-light-green-6 {
    color: rgb(149, 200, 90) !important;
}
.text-light-green-7 {
    color: rgb(145, 195, 92) !important;
}
.text-light-green-8 {
    color: rgb(151, 203, 106) !important;
}
.text-light-green-9 {
    color: rgb(157, 209, 120) !important;
}
.text-light-green-10 {
    color: rgb(164, 223, 142) !important;
}
.text-light-green-11 {
    color: rgb(196, 255, 126) !important;
}
.text-light-green-12 {
    color: rgb(177, 255, 88) !important;
}
.text-light-green-13 {
    color: rgb(131, 255, 28) !important;
}
.text-light-green-14 {
    color: rgb(124, 234, 54) !important;
}
.text-lime {
    color: rgb(209, 223, 73) !important;
}
.text-lime-1 {
    color: rgb(240, 245, 194) !important;
}
.text-lime-2 {
    color: rgb(234, 239, 170) !important;
}
.text-lime-3 {
    color: rgb(227, 236, 142) !important;
}
.text-lime-4 {
    color: rgb(219, 231, 115) !important;
}
.text-lime-5 {
    color: rgb(214, 226, 94) !important;
}
.text-lime-6 {
    color: rgb(209, 223, 73) !important;
}
.text-lime-7 {
    color: rgb(200, 209, 73) !important;
}
.text-lime-8 {
    color: rgb(210, 215, 88) !important;
}
.text-lime-9 {
    color: rgb(220, 219, 103) !important;
}
.text-lime-10 {
    color: rgb(231, 220, 121) !important;
}
.text-lime-11 {
    color: rgb(243, 255, 116) !important;
}
.text-lime-12 {
    color: rgb(239, 255, 71) !important;
}
.text-lime-13 {
    color: rgb(204, 255, 26) !important;
}
.text-lime-14 {
    color: rgb(200, 255, 40) !important;
}
.text-yellow {
    color: rgb(255, 236, 67) !important;
}
.text-yellow-1 {
    color: rgb(255, 249, 187) !important;
}
.text-yellow-2 {
    color: rgb(255, 246, 163) !important;
}
.text-yellow-3 {
    color: rgb(255, 243, 135) !important;
}
.text-yellow-4 {
    color: rgb(255, 240, 108) !important;
}
.text-yellow-5 {
    color: rgb(255, 238, 87) !important;
}
.text-yellow-6 {
    color: rgb(255, 236, 67) !important;
}
.text-yellow-7 {
    color: rgb(253, 218, 63) !important;
}
.text-yellow-8 {
    color: rgb(251, 196, 58) !important;
}
.text-yellow-9 {
    color: rgb(249, 174, 53) !important;
}
.text-yellow-10 {
    color: rgb(246, 138, 44) !important;
}
.text-yellow-11 {
    color: rgb(255, 255, 124) !important;
}
.text-yellow-12 {
    color: rgb(255, 255, 26) !important;
}
.text-yellow-13 {
    color: rgb(255, 236, 26) !important;
}
.text-yellow-14 {
    color: rgb(255, 218, 26) !important;
}
.text-amber {
    color: rgb(255, 199, 30) !important;
}
.text-amber-1 {
    color: rgb(255, 238, 183) !important;
}
.text-amber-2 {
    color: rgb(255, 229, 151) !important;
}
.text-amber-3 {
    color: rgb(255, 221, 116) !important;
}
.text-amber-4 {
    color: rgb(255, 213, 81) !important;
}
.text-amber-5 {
    color: rgb(255, 205, 53) !important;
}
.text-amber-6 {
    color: rgb(255, 199, 30) !important;
}
.text-amber-7 {
    color: rgb(255, 187, 26) !important;
}
.text-amber-8 {
    color: rgb(255, 170, 26) !important;
}
.text-amber-9 {
    color: rgb(255, 154, 26) !important;
}
.text-amber-10 {
    color: rgb(255, 125, 26) !important;
}
.text-amber-11 {
    color: rgb(255, 226, 114) !important;
}
.text-amber-12 {
    color: rgb(255, 216, 70) !important;
}
.text-amber-13 {
    color: rgb(255, 202, 26) !important;
}
.text-amber-14 {
    color: rgb(255, 179, 26) !important;
}
.text-orange {
    color: rgb(255, 162, 26) !important;
}
.text-orange-1 {
    color: rgb(255, 227, 182) !important;
}
.text-orange-2 {
    color: rgb(255, 213, 150) !important;
}
.text-orange-3 {
    color: rgb(255, 199, 115) !important;
}
.text-orange-4 {
    color: rgb(255, 184, 79) !important;
}
.text-orange-5 {
    color: rgb(255, 173, 52) !important;
}
.text-orange-6 {
    color: rgb(255, 162, 26) !important;
}
.text-orange-7 {
    color: rgb(255, 155, 28) !important;
}
.text-orange-8 {
    color: rgb(255, 145, 33) !important;
}
.text-orange-9 {
    color: rgb(255, 135, 37) !important;
}
.text-orange-10 {
    color: rgb(255, 118, 43) !important;
}
.text-orange-11 {
    color: rgb(255, 204, 115) !important;
}
.text-orange-12 {
    color: rgb(255, 174, 70) !important;
}
.text-orange-13 {
    color: rgb(255, 156, 26) !important;
}
.text-orange-14 {
    color: rgb(255, 124, 26) !important;
}
.text-deep-orange {
    color: rgb(255, 99, 49) !important;
}
.text-deep-orange-1 {
    color: rgb(245, 200, 194) !important;
}
.text-deep-orange-2 {
    color: rgb(255, 180, 157) !important;
}
.text-deep-orange-3 {
    color: rgb(255, 157, 127) !important;
}
.text-deep-orange-4 {
    color: rgb(255, 134, 96) !important;
}
.text-deep-orange-5 {
    color: rgb(255, 116, 72) !important;
}
.text-deep-orange-6 {
    color: rgb(255, 99, 49) !important;
}
.text-deep-orange-7 {
    color: rgb(245, 96, 49) !important;
}
.text-deep-orange-8 {
    color: rgb(233, 92, 48) !important;
}
.text-deep-orange-9 {
    color: rgb(236, 99, 57) !important;
}
.text-deep-orange-10 {
    color: rgb(244, 113, 73) !important;
}
.text-deep-orange-11 {
    color: rgb(255, 148, 115) !important;
}
.text-deep-orange-12 {
    color: rgb(255, 115, 70) !important;
}
.text-deep-orange-13 {
    color: rgb(255, 80, 26) !important;
}
.text-deep-orange-14 {
    color: rgb(255, 90, 49) !important;
}
.text-brown {
    color: rgb(186, 151, 138) !important;
}
.text-brown-1 {
    color: rgb(220, 217, 212) !important;
}
.text-brown-2 {
    color: rgb(202, 197, 190) !important;
}
.text-brown-3 {
    color: rgb(182, 176, 166) !important;
}
.text-brown-4 {
    color: rgb(162, 154, 142) !important;
}
.text-brown-5 {
    color: rgb(156, 148, 135) !important;
}
.text-brown-6 {
    color: rgb(186, 151, 138) !important;
}
.text-brown-7 {
    color: rgb(190, 158, 147) !important;
}
.text-brown-8 {
    color: rgb(198, 167, 158) !important;
}
.text-brown-9 {
    color: rgb(204, 175, 168) !important;
}
.text-brown-10 {
    color: rgb(201, 197, 190) !important;
}
.text-brown-11 {
    color: rgb(202, 197, 190) !important;
}
.text-brown-12 {
    color: rgb(182, 176, 166) !important;
}
.text-brown-13 {
    color: rgb(156, 148, 135) !important;
}
.text-brown-14 {
    color: rgb(198, 167, 158) !important;
}
.text-grey {
    color: rgb(171, 163, 152) !important;
}
.text-grey-1 {
    color: rgb(229, 227, 223) !important;
}
.text-grey-2 {
    color: rgb(226, 223, 219) !important;
}
.text-grey-3 {
    color: rgb(221, 218, 214) !important;
}
.text-grey-4 {
    color: rgb(212, 209, 203) !important;
}
.text-grey-5 {
    color: rgb(190, 185, 176) !important;
}
.text-grey-6 {
    color: rgb(171, 163, 152) !important;
}
.text-grey-7 {
    color: rgb(158, 150, 137) !important;
}
.text-grey-8 {
    color: rgb(171, 163, 152) !important;
}
.text-grey-9 {
    color: rgb(190, 185, 176) !important;
}
.text-grey-10 {
    color: rgb(211, 207, 202) !important;
}
.text-grey-11 {
    color: rgb(226, 223, 219) !important;
}
.text-grey-12 {
    color: rgb(221, 218, 214) !important;
}
.text-grey-13 {
    color: rgb(190, 185, 176) !important;
}
.text-grey-14 {
    color: rgb(171, 163, 152) !important;
}
.text-blue-grey {
    color: rgb(158, 149, 137) !important;
}
.text-blue-grey-1 {
    color: rgb(222, 219, 214) !important;
}
.text-blue-grey-2 {
    color: rgb(206, 202, 195) !important;
}
.text-blue-grey-3 {
    color: rgb(189, 183, 174) !important;
}
.text-blue-grey-4 {
    color: rgb(171, 164, 153) !important;
}
.text-blue-grey-5 {
    color: rgb(158, 150, 137) !important;
}
.text-blue-grey-6 {
    color: rgb(158, 149, 137) !important;
}
.text-blue-grey-7 {
    color: rgb(167, 159, 148) !important;
}
.text-blue-grey-8 {
    color: rgb(179, 172, 162) !important;
}
.text-blue-grey-9 {
    color: rgb(190, 184, 176) !important;
}
.text-blue-grey-10 {
    color: rgb(202, 198, 191) !important;
}
.text-blue-grey-11 {
    color: rgb(206, 202, 195) !important;
}
.text-blue-grey-12 {
    color: rgb(189, 183, 174) !important;
}
.text-blue-grey-13 {
    color: rgb(158, 150, 137) !important;
}
.text-blue-grey-14 {
    color: rgb(179, 172, 162) !important;
}
.bg-red {
    background-image: initial !important;
    background-color: rgb(169, 20, 9) !important;
}
.bg-red-1 {
    background-image: initial !important;
    background-color: rgb(63, 0, 9) !important;
}
.bg-red-2 {
    background-image: initial !important;
    background-color: rgb(81, 0, 8) !important;
}
.bg-red-3 {
    background-image: initial !important;
    background-color: rgb(105, 17, 17) !important;
}
.bg-red-4 {
    background-image: initial !important;
    background-color: rgb(127, 24, 24) !important;
}
.bg-red-5 {
    background-image: initial !important;
    background-color: rgb(152, 16, 14) !important;
}
.bg-red-6 {
    background-image: initial !important;
    background-color: rgb(169, 20, 9) !important;
}
.bg-red-7 {
    background-image: initial !important;
    background-color: rgb(166, 25, 21) !important;
}
.bg-red-8 {
    background-image: initial !important;
    background-color: rgb(167, 35, 35) !important;
}
.bg-red-9 {
    background-image: initial !important;
    background-color: rgb(158, 32, 32) !important;
}
.bg-red-10 {
    background-image: initial !important;
    background-color: rgb(146, 22, 22) !important;
}
.bg-red-11 {
    background-image: initial !important;
    background-color: rgb(127, 10, 0) !important;
}
.bg-red-12 {
    background-image: initial !important;
    background-color: rgb(155, 0, 0) !important;
}
.bg-red-13 {
    background-image: initial !important;
    background-color: rgb(190, 0, 37) !important;
}
.bg-red-14 {
    background-image: initial !important;
    background-color: rgb(170, 0, 0) !important;
}
.bg-pink {
    background-image: initial !important;
    background-color: rgb(181, 18, 73) !important;
}
.bg-pink-1 {
    background-image: initial !important;
    background-color: rgb(62, 7, 25) !important;
}
.bg-pink-2 {
    background-image: initial !important;
    background-color: rgb(87, 9, 36) !important;
}
.bg-pink-3 {
    background-image: initial !important;
    background-color: rgb(114, 11, 46) !important;
}
.bg-pink-4 {
    background-image: initial !important;
    background-color: rgb(141, 13, 56) !important;
}
.bg-pink-5 {
    background-image: initial !important;
    background-color: rgb(161, 16, 65) !important;
}
.bg-pink-6 {
    background-image: initial !important;
    background-color: rgb(181, 18, 73) !important;
}
.bg-pink-7 {
    background-image: initial !important;
    background-color: rgb(173, 22, 77) !important;
}
.bg-pink-8 {
    background-image: initial !important;
    background-color: rgb(155, 19, 73) !important;
}
.bg-pink-9 {
    background-image: initial !important;
    background-color: rgb(138, 16, 70) !important;
}
.bg-pink-10 {
    background-image: initial !important;
    background-color: rgb(109, 11, 63) !important;
}
.bg-pink-11 {
    background-image: initial !important;
    background-color: rgb(127, 0, 43) !important;
}
.bg-pink-12 {
    background-image: initial !important;
    background-color: rgb(166, 0, 56) !important;
}
.bg-pink-13 {
    background-image: initial !important;
    background-color: rgb(196, 0, 70) !important;
}
.bg-pink-14 {
    background-image: initial !important;
    background-color: rgb(158, 14, 78) !important;
}
.bg-purple {
    background-image: initial !important;
    background-color: rgb(125, 31, 141) !important;
}
.bg-purple-1 {
    background-image: initial !important;
    background-color: rgb(48, 20, 52) !important;
}
.bg-purple-2 {
    background-image: initial !important;
    background-color: rgb(69, 28, 76) !important;
}
.bg-purple-3 {
    background-image: initial !important;
    background-color: rgb(93, 37, 102) !important;
}
.bg-purple-4 {
    background-image: initial !important;
    background-color: rgb(116, 47, 128) !important;
}
.bg-purple-5 {
    background-image: initial !important;
    background-color: rgb(134, 54, 148) !important;
}
.bg-purple-6 {
    background-image: initial !important;
    background-color: rgb(125, 31, 141) !important;
}
.bg-purple-7 {
    background-image: initial !important;
    background-color: rgb(114, 29, 136) !important;
}
.bg-purple-8 {
    background-image: initial !important;
    background-color: rgb(98, 25, 130) !important;
}
.bg-purple-9 {
    background-image: initial !important;
    background-color: rgb(85, 22, 123) !important;
}
.bg-purple-10 {
    background-image: initial !important;
    background-color: rgb(59, 16, 112) !important;
}
.bg-purple-11 {
    background-image: initial !important;
    background-color: rgb(108, 3, 126) !important;
}
.bg-purple-12 {
    background-image: initial !important;
    background-color: rgb(141, 3, 165) !important;
}
.bg-purple-13 {
    background-image: initial !important;
    background-color: rgb(170, 0, 199) !important;
}
.bg-purple-14 {
    background-image: initial !important;
    background-color: rgb(136, 0, 204) !important;
}
.bg-deep-purple {
    background-image: initial !important;
    background-color: rgb(82, 46, 146) !important;
}
.bg-deep-purple-1 {
    background-image: initial !important;
    background-color: rgb(33, 36, 37) !important;
}
.bg-deep-purple-2 {
    background-image: initial !important;
    background-color: rgb(47, 51, 53) !important;
}
.bg-deep-purple-3 {
    background-image: initial !important;
    background-color: rgb(57, 35, 96) !important;
}
.bg-deep-purple-4 {
    background-image: initial !important;
    background-color: rgb(71, 44, 120) !important;
}
.bg-deep-purple-5 {
    background-image: initial !important;
    background-color: rgb(82, 50, 138) !important;
}
.bg-deep-purple-6 {
    background-image: initial !important;
    background-color: rgb(82, 46, 146) !important;
}
.bg-deep-purple-7 {
    background-image: initial !important;
    background-color: rgb(75, 42, 142) !important;
}
.bg-deep-purple-8 {
    background-image: initial !important;
    background-color: rgb(65, 36, 134) !important;
}
.bg-deep-purple-9 {
    background-image: initial !important;
    background-color: rgb(55, 31, 128) !important;
}
.bg-deep-purple-10 {
    background-image: initial !important;
    background-color: rgb(39, 22, 117) !important;
}
.bg-deep-purple-11 {
    background-image: initial !important;
    background-color: rgb(44, 0, 122) !important;
}
.bg-deep-purple-12 {
    background-image: initial !important;
    background-color: rgb(42, 0, 158) !important;
}
.bg-deep-purple-13 {
    background-image: initial !important;
    background-color: rgb(58, 0, 185) !important;
}
.bg-deep-purple-14 {
    background-image: initial !important;
    background-color: rgb(78, 0, 187) !important;
}
.bg-indigo {
    background-image: initial !important;
    background-color: rgb(50, 65, 145) !important;
}
.bg-indigo-1 {
    background-image: initial !important;
    background-color: rgb(33, 36, 37) !important;
}
.bg-indigo-2 {
    background-image: initial !important;
    background-color: rgb(47, 50, 52) !important;
}
.bg-indigo-3 {
    background-image: initial !important;
    background-color: rgb(36, 45, 94) !important;
}
.bg-indigo-4 {
    background-image: initial !important;
    background-color: rgb(45, 57, 117) !important;
}
.bg-indigo-5 {
    background-image: initial !important;
    background-color: rgb(52, 64, 135) !important;
}
.bg-indigo-6 {
    background-image: initial !important;
    background-color: rgb(50, 65, 145) !important;
}
.bg-indigo-7 {
    background-image: initial !important;
    background-color: rgb(46, 58, 137) !important;
}
.bg-indigo-8 {
    background-image: initial !important;
    background-color: rgb(38, 50, 127) !important;
}
.bg-indigo-9 {
    background-image: initial !important;
    background-color: rgb(32, 42, 118) !important;
}
.bg-indigo-10 {
    background-image: initial !important;
    background-color: rgb(21, 28, 101) !important;
}
.bg-indigo-11 {
    background-image: initial !important;
    background-color: rgb(0, 19, 120) !important;
}
.bg-indigo-12 {
    background-image: initial !important;
    background-color: rgb(1, 24, 154) !important;
}
.bg-indigo-13 {
    background-image: initial !important;
    background-color: rgb(1, 26, 167) !important;
}
.bg-indigo-14 {
    background-image: initial !important;
    background-color: rgb(1, 27, 175) !important;
}
.bg-blue {
    background-image: initial !important;
    background-color: rgb(10, 106, 182) !important;
}
.bg-blue-1 {
    background-image: initial !important;
    background-color: rgb(32, 35, 37) !important;
}
.bg-blue-2 {
    background-image: initial !important;
    background-color: rgb(44, 48, 50) !important;
}
.bg-blue-3 {
    background-image: initial !important;
    background-color: rgb(6, 66, 115) !important;
}
.bg-blue-4 {
    background-image: initial !important;
    background-color: rgb(8, 82, 141) !important;
}
.bg-blue-5 {
    background-image: initial !important;
    background-color: rgb(9, 93, 162) !important;
}
.bg-blue-6 {
    background-image: initial !important;
    background-color: rgb(10, 106, 182) !important;
}
.bg-blue-7 {
    background-image: initial !important;
    background-color: rgb(21, 106, 181) !important;
}
.bg-blue-8 {
    background-image: initial !important;
    background-color: rgb(20, 94, 168) !important;
}
.bg-blue-9 {
    background-image: initial !important;
    background-color: rgb(17, 81, 154) !important;
}
.bg-blue-10 {
    background-image: initial !important;
    background-color: rgb(10, 57, 129) !important;
}
.bg-blue-11 {
    background-image: initial !important;
    background-color: rgb(0, 47, 126) !important;
}
.bg-blue-12 {
    background-image: initial !important;
    background-color: rgb(0, 61, 163) !important;
}
.bg-blue-13 {
    background-image: initial !important;
    background-color: rgb(0, 67, 179) !important;
}
.bg-blue-14 {
    background-image: initial !important;
    background-color: rgb(0, 48, 179) !important;
}
.bg-light-blue {
    background-image: initial !important;
    background-color: rgb(2, 135, 195) !important;
}
.bg-light-blue-1 {
    background-image: initial !important;
    background-color: rgb(2, 47, 67) !important;
}
.bg-light-blue-2 {
    background-image: initial !important;
    background-color: rgb(4, 66, 95) !important;
}
.bg-light-blue-3 {
    background-image: initial !important;
    background-color: rgb(5, 87, 125) !important;
}
.bg-light-blue-4 {
    background-image: initial !important;
    background-color: rgb(7, 109, 154) !important;
}
.bg-light-blue-5 {
    background-image: initial !important;
    background-color: rgb(7, 124, 177) !important;
}
.bg-light-blue-6 {
    background-image: initial !important;
    background-color: rgb(2, 135, 195) !important;
}
.bg-light-blue-7 {
    background-image: initial !important;
    background-color: rgb(2, 124, 183) !important;
}
.bg-light-blue-8 {
    background-image: initial !important;
    background-color: rgb(2, 109, 167) !important;
}
.bg-light-blue-9 {
    background-image: initial !important;
    background-color: rgb(2, 95, 151) !important;
}
.bg-light-blue-10 {
    background-image: initial !important;
    background-color: rgb(1, 70, 124) !important;
}
.bg-light-blue-11 {
    background-image: initial !important;
    background-color: rgb(0, 88, 127) !important;
}
.bg-light-blue-12 {
    background-image: initial !important;
    background-color: rgb(0, 114, 166) !important;
}
.bg-light-blue-13 {
    background-image: initial !important;
    background-color: rgb(0, 141, 204) !important;
}
.bg-light-blue-14 {
    background-image: initial !important;
    background-color: rgb(0, 116, 187) !important;
}
.bg-cyan {
    background-image: initial !important;
    background-color: rgb(0, 150, 170) !important;
}
.bg-cyan-1 {
    background-image: initial !important;
    background-color: rgb(10, 56, 63) !important;
}
.bg-cyan-2 {
    background-image: initial !important;
    background-color: rgb(15, 82, 90) !important;
}
.bg-cyan-3 {
    background-image: initial !important;
    background-color: rgb(20, 109, 120) !important;
}
.bg-cyan-4 {
    background-image: initial !important;
    background-color: rgb(25, 136, 150) !important;
}
.bg-cyan-5 {
    background-image: initial !important;
    background-color: rgb(30, 158, 174) !important;
}
.bg-cyan-6 {
    background-image: initial !important;
    background-color: rgb(0, 150, 170) !important;
}
.bg-cyan-7 {
    background-image: initial !important;
    background-color: rgb(0, 138, 154) !important;
}
.bg-cyan-8 {
    background-image: initial !important;
    background-color: rgb(0, 121, 134) !important;
}
.bg-cyan-9 {
    background-image: initial !important;
    background-color: rgb(0, 105, 114) !important;
}
.bg-cyan-10 {
    background-image: initial !important;
    background-color: rgb(0, 77, 80) !important;
}
.bg-cyan-11 {
    background-image: initial !important;
    background-color: rgb(0, 125, 125) !important;
}
.bg-cyan-12 {
    background-image: initial !important;
    background-color: rgb(0, 190, 190) !important;
}
.bg-cyan-13 {
    background-image: initial !important;
    background-color: rgb(0, 183, 204) !important;
}
.bg-cyan-14 {
    background-image: initial !important;
    background-color: rgb(0, 147, 170) !important;
}
.bg-teal {
    background-image: initial !important;
    background-color: rgb(0, 120, 109) !important;
}
.bg-teal-1 {
    background-image: initial !important;
    background-color: rgb(23, 55, 53) !important;
}
.bg-teal-2 {
    background-image: initial !important;
    background-color: rgb(34, 82, 79) !important;
}
.bg-teal-3 {
    background-image: initial !important;
    background-color: rgb(46, 112, 108) !important;
}
.bg-teal-4 {
    background-image: initial !important;
    background-color: rgb(59, 143, 137) !important;
}
.bg-teal-5 {
    background-image: initial !important;
    background-color: rgb(30, 133, 123) !important;
}
.bg-teal-6 {
    background-image: initial !important;
    background-color: rgb(0, 120, 109) !important;
}
.bg-teal-7 {
    background-image: initial !important;
    background-color: rgb(0, 110, 98) !important;
}
.bg-teal-8 {
    background-image: initial !important;
    background-color: rgb(0, 97, 86) !important;
}
.bg-teal-9 {
    background-image: initial !important;
    background-color: rgb(0, 84, 74) !important;
}
.bg-teal-10 {
    background-image: initial !important;
    background-color: rgb(0, 62, 51) !important;
}
.bg-teal-11 {
    background-image: initial !important;
    background-color: rgb(0, 104, 86) !important;
}
.bg-teal-12 {
    background-image: initial !important;
    background-color: rgb(0, 144, 118) !important;
}
.bg-teal-13 {
    background-image: initial !important;
    background-color: rgb(18, 182, 151) !important;
}
.bg-teal-14 {
    background-image: initial !important;
    background-color: rgb(0, 153, 132) !important;
}
.bg-green {
    background-image: initial !important;
    background-color: rgb(61, 140, 64) !important;
}
.bg-green-1 {
    background-image: initial !important;
    background-color: rgb(21, 49, 30) !important;
}
.bg-green-2 {
    background-image: initial !important;
    background-color: rgb(31, 68, 41) !important;
}
.bg-green-3 {
    background-image: initial !important;
    background-color: rgb(41, 89, 54) !important;
}
.bg-green-4 {
    background-image: initial !important;
    background-color: rgb(49, 111, 67) !important;
}
.bg-green-5 {
    background-image: initial !important;
    background-color: rgb(56, 127, 77) !important;
}
.bg-green-6 {
    background-image: initial !important;
    background-color: rgb(61, 140, 64) !important;
}
.bg-green-7 {
    background-image: initial !important;
    background-color: rgb(54, 128, 57) !important;
}
.bg-green-8 {
    background-image: initial !important;
    background-color: rgb(45, 114, 48) !important;
}
.bg-green-9 {
    background-image: initial !important;
    background-color: rgb(37, 100, 40) !important;
}
.bg-green-10 {
    background-image: initial !important;
    background-color: rgb(22, 75, 26) !important;
}
.bg-green-11 {
    background-image: initial !important;
    background-color: rgb(11, 87, 46) !important;
}
.bg-green-12 {
    background-image: initial !important;
    background-color: rgb(14, 136, 91) !important;
}
.bg-green-13 {
    background-image: initial !important;
    background-color: rgb(0, 184, 94) !important;
}
.bg-green-14 {
    background-image: initial !important;
    background-color: rgb(0, 160, 66) !important;
}
.bg-light-green {
    background-image: initial !important;
    background-color: rgb(113, 147, 49) !important;
}
.bg-light-green-1 {
    background-image: initial !important;
    background-color: rgb(40, 52, 17) !important;
}
.bg-light-green-2 {
    background-image: initial !important;
    background-color: rgb(55, 71, 23) !important;
}
.bg-light-green-3 {
    background-image: initial !important;
    background-color: rgb(71, 92, 31) !important;
}
.bg-light-green-4 {
    background-image: initial !important;
    background-color: rgb(87, 114, 38) !important;
}
.bg-light-green-5 {
    background-image: initial !important;
    background-color: rgb(100, 131, 43) !important;
}
.bg-light-green-6 {
    background-image: initial !important;
    background-color: rgb(113, 147, 49) !important;
}
.bg-light-green-7 {
    background-image: initial !important;
    background-color: rgb(99, 143, 53) !important;
}
.bg-light-green-8 {
    background-image: initial !important;
    background-color: rgb(83, 127, 45) !important;
}
.bg-light-green-9 {
    background-image: initial !important;
    background-color: rgb(68, 111, 38) !important;
}
.bg-light-green-10 {
    background-image: initial !important;
    background-color: rgb(41, 84, 24) !important;
}
.bg-light-green-11 {
    background-image: initial !important;
    background-color: rgb(77, 118, 0) !important;
}
.bg-light-green-12 {
    background-image: initial !important;
    background-color: rgb(98, 151, 0) !important;
}
.bg-light-green-13 {
    background-image: initial !important;
    background-color: rgb(120, 202, 0) !important;
}
.bg-light-green-14 {
    background-image: initial !important;
    background-color: rgb(80, 177, 18) !important;
}
.bg-lime {
    background-image: initial !important;
    background-color: rgb(115, 122, 21) !important;
}
.bg-lime-1 {
    background-image: initial !important;
    background-color: rgb(41, 44, 7) !important;
}
.bg-lime-2 {
    background-image: initial !important;
    background-color: rgb(56, 59, 11) !important;
}
.bg-lime-3 {
    background-image: initial !important;
    background-color: rgb(73, 77, 13) !important;
}
.bg-lime-4 {
    background-image: initial !important;
    background-color: rgb(89, 95, 16) !important;
}
.bg-lime-5 {
    background-image: initial !important;
    background-color: rgb(102, 108, 19) !important;
}
.bg-lime-6 {
    background-image: initial !important;
    background-color: rgb(115, 122, 21) !important;
}
.bg-lime-7 {
    background-image: initial !important;
    background-color: rgb(154, 162, 41) !important;
}
.bg-lime-8 {
    background-image: initial !important;
    background-color: rgb(140, 144, 34) !important;
}
.bg-lime-9 {
    background-image: initial !important;
    background-color: rgb(126, 126, 29) !important;
}
.bg-lime-10 {
    background-image: initial !important;
    background-color: rgb(104, 95, 18) !important;
}
.bg-lime-11 {
    background-image: initial !important;
    background-color: rgb(89, 95, 0) !important;
}
.bg-lime-12 {
    background-image: initial !important;
    background-color: rgb(115, 124, 0) !important;
}
.bg-lime-13 {
    background-image: initial !important;
    background-color: rgb(127, 153, 0) !important;
}
.bg-lime-14 {
    background-image: initial !important;
    background-color: rgb(139, 187, 0) !important;
}
.bg-yellow {
    background-image: initial !important;
    background-color: rgb(126, 114, 0) !important;
}
.bg-yellow-1 {
    background-image: initial !important;
    background-color: rgb(49, 45, 0) !important;
}
.bg-yellow-2 {
    background-image: initial !important;
    background-color: rgb(65, 58, 0) !important;
}
.bg-yellow-3 {
    background-image: initial !important;
    background-color: rgb(82, 74, 0) !important;
}
.bg-yellow-4 {
    background-image: initial !important;
    background-color: rgb(100, 90, 0) !important;
}
.bg-yellow-5 {
    background-image: initial !important;
    background-color: rgb(113, 102, 0) !important;
}
.bg-yellow-6 {
    background-image: initial !important;
    background-color: rgb(126, 114, 0) !important;
}
.bg-yellow-7 {
    background-image: initial !important;
    background-color: rgb(129, 105, 1) !important;
}
.bg-yellow-8 {
    background-image: initial !important;
    background-color: rgb(132, 95, 3) !important;
}
.bg-yellow-9 {
    background-image: initial !important;
    background-color: rgb(180, 113, 5) !important;
}
.bg-yellow-10 {
    background-image: initial !important;
    background-color: rgb(188, 92, 8) !important;
}
.bg-yellow-11 {
    background-image: initial !important;
    background-color: rgb(90, 90, 0) !important;
}
.bg-yellow-12 {
    background-image: initial !important;
    background-color: rgb(153, 153, 0) !important;
}
.bg-yellow-13 {
    background-image: initial !important;
    background-color: rgb(153, 140, 0) !important;
}
.bg-yellow-14 {
    background-image: initial !important;
    background-color: rgb(153, 128, 0) !important;
}
.bg-amber {
    background-image: initial !important;
    background-color: rgb(150, 112, 0) !important;
}
.bg-amber-1 {
    background-image: initial !important;
    background-color: rgb(52, 40, 0) !important;
}
.bg-amber-2 {
    background-image: initial !important;
    background-color: rgb(72, 54, 0) !important;
}
.bg-amber-3 {
    background-image: initial !important;
    background-color: rgb(95, 71, 0) !important;
}
.bg-amber-4 {
    background-image: initial !important;
    background-color: rgb(117, 89, 0) !important;
}
.bg-amber-5 {
    background-image: initial !important;
    background-color: rgb(135, 102, 0) !important;
}
.bg-amber-6 {
    background-image: initial !important;
    background-color: rgb(150, 112, 0) !important;
}
.bg-amber-7 {
    background-image: initial !important;
    background-color: rgb(153, 107, 0) !important;
}
.bg-amber-8 {
    background-image: initial !important;
    background-color: rgb(204, 128, 0) !important;
}
.bg-amber-9 {
    background-image: initial !important;
    background-color: rgb(204, 114, 0) !important;
}
.bg-amber-10 {
    background-image: initial !important;
    background-color: rgb(204, 89, 0) !important;
}
.bg-amber-11 {
    background-image: initial !important;
    background-color: rgb(96, 76, 0) !important;
}
.bg-amber-12 {
    background-image: initial !important;
    background-color: rgb(124, 98, 0) !important;
}
.bg-amber-13 {
    background-image: initial !important;
    background-color: rgb(153, 118, 0) !important;
}
.bg-amber-14 {
    background-image: initial !important;
    background-color: rgb(153, 103, 0) !important;
}
.bg-orange {
    background-image: initial !important;
    background-color: rgb(204, 122, 0) !important;
}
.bg-orange-1 {
    background-image: initial !important;
    background-color: rgb(70, 43, 0) !important;
}
.bg-orange-2 {
    background-image: initial !important;
    background-color: rgb(97, 58, 0) !important;
}
.bg-orange-3 {
    background-image: initial !important;
    background-color: rgb(127, 76, 0) !important;
}
.bg-orange-4 {
    background-image: initial !important;
    background-color: rgb(158, 94, 0) !important;
}
.bg-orange-5 {
    background-image: initial !important;
    background-color: rgb(181, 108, 0) !important;
}
.bg-orange-6 {
    background-image: initial !important;
    background-color: rgb(204, 122, 0) !important;
}
.bg-orange-7 {
    background-image: initial !important;
    background-color: rgb(201, 112, 0) !important;
}
.bg-orange-8 {
    background-image: initial !important;
    background-color: rgb(196, 99, 0) !important;
}
.bg-orange-9 {
    background-image: initial !important;
    background-color: rgb(191, 86, 0) !important;
}
.bg-orange-10 {
    background-image: initial !important;
    background-color: rgb(184, 65, 0) !important;
}
.bg-orange-11 {
    background-image: initial !important;
    background-color: rgb(127, 81, 0) !important;
}
.bg-orange-12 {
    background-image: initial !important;
    background-color: rgb(166, 93, 0) !important;
}
.bg-orange-13 {
    background-image: initial !important;
    background-color: rgb(204, 116, 0) !important;
}
.bg-orange-14 {
    background-image: initial !important;
    background-color: rgb(204, 87, 0) !important;
}
.bg-deep-orange {
    background-image: initial !important;
    background-color: rgb(184, 44, 0) !important;
}
.bg-deep-orange-1 {
    background-image: initial !important;
    background-color: rgb(58, 15, 10) !important;
}
.bg-deep-orange-2 {
    background-image: initial !important;
    background-color: rgb(91, 22, 0) !important;
}
.bg-deep-orange-3 {
    background-image: initial !important;
    background-color: rgb(117, 28, 0) !important;
}
.bg-deep-orange-4 {
    background-image: initial !important;
    background-color: rgb(143, 34, 0) !important;
}
.bg-deep-orange-5 {
    background-image: initial !important;
    background-color: rgb(164, 39, 0) !important;
}
.bg-deep-orange-6 {
    background-image: initial !important;
    background-color: rgb(184, 44, 0) !important;
}
.bg-deep-orange-7 {
    background-image: initial !important;
    background-color: rgb(184, 51, 9) !important;
}
.bg-deep-orange-8 {
    background-image: initial !important;
    background-color: rgb(184, 59, 20) !important;
}
.bg-deep-orange-9 {
    background-image: initial !important;
    background-color: rgb(173, 54, 17) !important;
}
.bg-deep-orange-10 {
    background-image: initial !important;
    background-color: rgb(153, 43, 10) !important;
}
.bg-deep-orange-11 {
    background-image: initial !important;
    background-color: rgb(127, 30, 0) !important;
}
.bg-deep-orange-12 {
    background-image: initial !important;
    background-color: rgb(166, 40, 0) !important;
}
.bg-deep-orange-13 {
    background-image: initial !important;
    background-color: rgb(204, 49, 0) !important;
}
.bg-deep-orange-14 {
    background-image: initial !important;
    background-color: rgb(177, 35, 0) !important;
}
.bg-brown {
    background-image: initial !important;
    background-color: rgb(97, 68, 58) !important;
}
.bg-brown-1 {
    background-image: initial !important;
    background-color: rgb(43, 35, 31) !important;
}
.bg-brown-2 {
    background-image: initial !important;
    background-color: rgb(63, 50, 45) !important;
}
.bg-brown-3 {
    background-image: initial !important;
    background-color: rgb(84, 67, 62) !important;
}
.bg-brown-4 {
    background-image: initial !important;
    background-color: rgb(106, 85, 78) !important;
}
.bg-brown-5 {
    background-image: initial !important;
    background-color: rgb(113, 88, 79) !important;
}
.bg-brown-6 {
    background-image: initial !important;
    background-color: rgb(97, 68, 58) !important;
}
.bg-brown-7 {
    background-image: initial !important;
    background-color: rgb(87, 61, 52) !important;
}
.bg-brown-8 {
    background-image: initial !important;
    background-color: rgb(74, 51, 44) !important;
}
.bg-brown-9 {
    background-image: initial !important;
    background-color: rgb(62, 42, 37) !important;
}
.bg-brown-10 {
    background-image: initial !important;
    background-color: rgb(50, 31, 28) !important;
}
.bg-brown-11 {
    background-image: initial !important;
    background-color: rgb(63, 50, 45) !important;
}
.bg-brown-12 {
    background-image: initial !important;
    background-color: rgb(84, 67, 62) !important;
}
.bg-brown-13 {
    background-image: initial !important;
    background-color: rgb(113, 88, 79) !important;
}
.bg-brown-14 {
    background-image: initial !important;
    background-color: rgb(74, 51, 44) !important;
}
.bg-grey {
    background-image: initial !important;
    background-color: rgb(79, 85, 89) !important;
}
.bg-grey-1 {
    background-image: initial !important;
    background-color: rgb(27, 29, 30) !important;
}
.bg-grey-2 {
    background-image: initial !important;
    background-color: rgb(30, 32, 33) !important;
}
.bg-grey-3 {
    background-image: initial !important;
    background-color: rgb(34, 36, 38) !important;
}
.bg-grey-4 {
    background-image: initial !important;
    background-color: rgb(42, 45, 47) !important;
}
.bg-grey-5 {
    background-image: initial !important;
    background-color: rgb(61, 66, 69) !important;
}
.bg-grey-6 {
    background-image: initial !important;
    background-color: rgb(79, 85, 89) !important;
}
.bg-grey-7 {
    background-image: initial !important;
    background-color: rgb(88, 95, 99) !important;
}
.bg-grey-8 {
    background-image: initial !important;
    background-color: rgb(73, 79, 82) !important;
}
.bg-grey-9 {
    background-image: initial !important;
    background-color: rgb(50, 54, 56) !important;
}
.bg-grey-10 {
    background-image: initial !important;
    background-color: rgb(25, 27, 28) !important;
}
.bg-grey-11 {
    background-image: initial !important;
    background-color: rgb(30, 32, 33) !important;
}
.bg-grey-12 {
    background-image: initial !important;
    background-color: rgb(34, 36, 38) !important;
}
.bg-grey-13 {
    background-image: initial !important;
    background-color: rgb(61, 66, 69) !important;
}
.bg-grey-14 {
    background-image: initial !important;
    background-color: rgb(73, 79, 82) !important;
}
.bg-blue-grey {
    background-image: initial !important;
    background-color: rgb(77, 100, 111) !important;
}
.bg-blue-grey-1 {
    background-image: initial !important;
    background-color: rgb(33, 36, 37) !important;
}
.bg-blue-grey-2 {
    background-image: initial !important;
    background-color: rgb(43, 53, 58) !important;
}
.bg-blue-grey-3 {
    background-image: initial !important;
    background-color: rgb(56, 70, 77) !important;
}
.bg-blue-grey-4 {
    background-image: initial !important;
    background-color: rgb(70, 87, 96) !important;
}
.bg-blue-grey-5 {
    background-image: initial !important;
    background-color: rgb(81, 101, 110) !important;
}
.bg-blue-grey-6 {
    background-image: initial !important;
    background-color: rgb(77, 100, 111) !important;
}
.bg-blue-grey-7 {
    background-image: initial !important;
    background-color: rgb(67, 88, 98) !important;
}
.bg-blue-grey-8 {
    background-image: initial !important;
    background-color: rgb(55, 72, 80) !important;
}
.bg-blue-grey-9 {
    background-image: initial !important;
    background-color: rgb(44, 57, 63) !important;
}
.bg-blue-grey-10 {
    background-image: initial !important;
    background-color: rgb(30, 40, 45) !important;
}
.bg-blue-grey-11 {
    background-image: initial !important;
    background-color: rgb(43, 53, 58) !important;
}
.bg-blue-grey-12 {
    background-image: initial !important;
    background-color: rgb(56, 70, 77) !important;
}
.bg-blue-grey-13 {
    background-image: initial !important;
    background-color: rgb(81, 101, 110) !important;
}
.bg-blue-grey-14 {
    background-image: initial !important;
    background-color: rgb(55, 72, 80) !important;
}
.shadow-1 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px,
    rgba(0, 0, 0, 0.14) 0px 1px 1px,
    rgba(0, 0, 0, 0.12) 0px 2px 1px -1px;
}
.shadow-up-1 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -1px 3px,
    rgba(0, 0, 0, 0.14) 0px -1px 1px,
    rgba(0, 0, 0, 0.12) 0px -2px 1px -1px;
}
.shadow-2 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 5px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px,
    rgba(0, 0, 0, 0.12) 0px 3px 1px -2px;
}
.shadow-up-2 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -1px 5px,
    rgba(0, 0, 0, 0.14) 0px -2px 2px,
    rgba(0, 0, 0, 0.12) 0px -3px 1px -2px;
}
.shadow-3 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 8px,
    rgba(0, 0, 0, 0.14) 0px 3px 4px,
    rgba(0, 0, 0, 0.12) 0px 3px 3px -2px;
}
.shadow-up-3 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -1px 8px,
    rgba(0, 0, 0, 0.14) 0px -3px 4px,
    rgba(0, 0, 0, 0.12) 0px -3px 3px -2px;
}
.shadow-4 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px -1px,
    rgba(0, 0, 0, 0.14) 0px 4px 5px,
    rgba(0, 0, 0, 0.12) 0px 1px 10px;
}
.shadow-up-4 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -2px 4px -1px,
    rgba(0, 0, 0, 0.14) 0px -4px 5px,
    rgba(0, 0, 0, 0.12) 0px -1px 10px;
}
.shadow-5 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0px 5px 8px,
    rgba(0, 0, 0, 0.12) 0px 1px 14px;
}
.shadow-up-5 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0px -5px 8px,
    rgba(0, 0, 0, 0.12) 0px -1px 14px;
}
.shadow-6 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0px 6px 10px,
    rgba(0, 0, 0, 0.12) 0px 1px 18px;
}
.shadow-up-6 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -3px 5px -1px,
    rgba(0, 0, 0, 0.14) 0px -6px 10px,
    rgba(0, 0, 0, 0.12) 0px -1px 18px;
}
.shadow-7 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 5px -2px,
    rgba(0, 0, 0, 0.14) 0px 7px 10px 1px,
    rgba(0, 0, 0, 0.12) 0px 2px 16px 1px;
}
.shadow-up-7 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -4px 5px -2px,
    rgba(0, 0, 0, 0.14) 0px -7px 10px 1px,
    rgba(0, 0, 0, 0.12) 0px -2px 16px 1px;
}
.shadow-8 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 5px -3px,
    rgba(0, 0, 0, 0.14) 0px 8px 10px 1px,
    rgba(0, 0, 0, 0.12) 0px 3px 14px 2px;
}
.shadow-up-8 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -5px 5px -3px,
    rgba(0, 0, 0, 0.14) 0px -8px 10px 1px,
    rgba(0, 0, 0, 0.12) 0px -3px 14px 2px;
}
.shadow-9 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 6px -3px,
    rgba(0, 0, 0, 0.14) 0px 9px 12px 1px,
    rgba(0, 0, 0, 0.12) 0px 3px 16px 2px;
}
.shadow-up-9 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -5px 6px -3px,
    rgba(0, 0, 0, 0.14) 0px -9px 12px 1px,
    rgba(0, 0, 0, 0.12) 0px -3px 16px 2px;
}
.shadow-10 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 6px -3px,
    rgba(0, 0, 0, 0.14) 0px 10px 14px 1px,
    rgba(0, 0, 0, 0.12) 0px 4px 18px 3px;
}
.shadow-up-10 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -6px 6px -3px,
    rgba(0, 0, 0, 0.14) 0px -10px 14px 1px,
    rgba(0, 0, 0, 0.12) 0px -4px 18px 3px;
}
.shadow-11 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 6px 7px -4px,
    rgba(0, 0, 0, 0.14) 0px 11px 15px 1px,
    rgba(0, 0, 0, 0.12) 0px 4px 20px 3px;
}
.shadow-up-11 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -6px 7px -4px,
    rgba(0, 0, 0, 0.14) 0px -11px 15px 1px,
    rgba(0, 0, 0, 0.12) 0px -4px 20px 3px;
}
.shadow-12 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 7px 8px -4px,
    rgba(0, 0, 0, 0.14) 0px 12px 17px 2px,
    rgba(0, 0, 0, 0.12) 0px 5px 22px 4px;
}
.shadow-up-12 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -7px 8px -4px,
    rgba(0, 0, 0, 0.14) 0px -12px 17px 2px,
    rgba(0, 0, 0, 0.12) 0px -5px 22px 4px;
}
.shadow-13 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 7px 8px -4px,
    rgba(0, 0, 0, 0.14) 0px 13px 19px 2px,
    rgba(0, 0, 0, 0.12) 0px 5px 24px 4px;
}
.shadow-up-13 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -7px 8px -4px,
    rgba(0, 0, 0, 0.14) 0px -13px 19px 2px,
    rgba(0, 0, 0, 0.12) 0px -5px 24px 4px;
}
.shadow-14 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 7px 9px -4px,
    rgba(0, 0, 0, 0.14) 0px 14px 21px 2px,
    rgba(0, 0, 0, 0.12) 0px 5px 26px 4px;
}
.shadow-up-14 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -7px 9px -4px,
    rgba(0, 0, 0, 0.14) 0px -14px 21px 2px,
    rgba(0, 0, 0, 0.12) 0px -5px 26px 4px;
}
.shadow-15 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 9px -5px,
    rgba(0, 0, 0, 0.14) 0px 15px 22px 2px,
    rgba(0, 0, 0, 0.12) 0px 6px 28px 5px;
}
.shadow-up-15 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -8px 9px -5px,
    rgba(0, 0, 0, 0.14) 0px -15px 22px 2px,
    rgba(0, 0, 0, 0.12) 0px -6px 28px 5px;
}
.shadow-16 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 10px -5px,
    rgba(0, 0, 0, 0.14) 0px 16px 24px 2px,
    rgba(0, 0, 0, 0.12) 0px 6px 30px 5px;
}
.shadow-up-16 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -8px 10px -5px,
    rgba(0, 0, 0, 0.14) 0px -16px 24px 2px,
    rgba(0, 0, 0, 0.12) 0px -6px 30px 5px;
}
.shadow-17 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 11px -5px,
    rgba(0, 0, 0, 0.14) 0px 17px 26px 2px,
    rgba(0, 0, 0, 0.12) 0px 6px 32px 5px;
}
.shadow-up-17 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -8px 11px -5px,
    rgba(0, 0, 0, 0.14) 0px -17px 26px 2px,
    rgba(0, 0, 0, 0.12) 0px -6px 32px 5px;
}
.shadow-18 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 9px 11px -5px,
    rgba(0, 0, 0, 0.14) 0px 18px 28px 2px,
    rgba(0, 0, 0, 0.12) 0px 7px 34px 6px;
}
.shadow-up-18 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -9px 11px -5px,
    rgba(0, 0, 0, 0.14) 0px -18px 28px 2px,
    rgba(0, 0, 0, 0.12) 0px -7px 34px 6px;
}
.shadow-19 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 9px 12px -6px,
    rgba(0, 0, 0, 0.14) 0px 19px 29px 2px,
    rgba(0, 0, 0, 0.12) 0px 7px 36px 6px;
}
.shadow-up-19 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -9px 12px -6px,
    rgba(0, 0, 0, 0.14) 0px -19px 29px 2px,
    rgba(0, 0, 0, 0.12) 0px -7px 36px 6px;
}
.shadow-20 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 13px -6px,
    rgba(0, 0, 0, 0.14) 0px 20px 31px 3px,
    rgba(0, 0, 0, 0.12) 0px 8px 38px 7px;
}
.shadow-up-20 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -10px 13px -6px,
    rgba(0, 0, 0, 0.14) 0px -20px 31px 3px,
    rgba(0, 0, 0, 0.12) 0px -8px 38px 7px;
}
.shadow-21 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 13px -6px,
    rgba(0, 0, 0, 0.14) 0px 21px 33px 3px,
    rgba(0, 0, 0, 0.12) 0px 8px 40px 7px;
}
.shadow-up-21 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -10px 13px -6px,
    rgba(0, 0, 0, 0.14) 0px -21px 33px 3px,
    rgba(0, 0, 0, 0.12) 0px -8px 40px 7px;
}
.shadow-22 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 10px 14px -6px,
    rgba(0, 0, 0, 0.14) 0px 22px 35px 3px,
    rgba(0, 0, 0, 0.12) 0px 8px 42px 7px;
}
.shadow-up-22 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -10px 14px -6px,
    rgba(0, 0, 0, 0.14) 0px -22px 35px 3px,
    rgba(0, 0, 0, 0.12) 0px -8px 42px 7px;
}
.shadow-23 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 11px 14px -7px,
    rgba(0, 0, 0, 0.14) 0px 23px 36px 3px,
    rgba(0, 0, 0, 0.12) 0px 9px 44px 8px;
}
.shadow-up-23 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -11px 14px -7px,
    rgba(0, 0, 0, 0.14) 0px -23px 36px 3px,
    rgba(0, 0, 0, 0.12) 0px -9px 44px 8px;
}
.shadow-24 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 11px 15px -7px,
    rgba(0, 0, 0, 0.14) 0px 24px 38px 3px,
    rgba(0, 0, 0, 0.12) 0px 9px 46px 8px;
}
.shadow-up-24 {
    box-shadow: rgba(0, 0, 0, 0.2) 0px -11px 15px -7px,
    rgba(0, 0, 0, 0.14) 0px -24px 38px 3px,
    rgba(0, 0, 0, 0.12) 0px -9px 46px 8px;
}
.inset-shadow {
    box-shadow: rgba(0, 0, 0, 0.7) 0px 7px 9px -7px inset;
}
.inset-shadow-down {
    box-shadow: rgba(0, 0, 0, 0.7) 0px -7px 9px -7px inset;
}
body.body--dark .shadow-1 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 1px 3px,
    rgba(24, 26, 27, 0.14) 0px 1px 1px,
    rgba(24, 26, 27, 0.12) 0px 2px 1px -1px;
}
body.body--dark .shadow-up-1 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -1px 3px,
    rgba(24, 26, 27, 0.14) 0px -1px 1px,
    rgba(24, 26, 27, 0.12) 0px -2px 1px -1px;
}
body.body--dark .shadow-2 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 1px 5px,
    rgba(24, 26, 27, 0.14) 0px 2px 2px,
    rgba(24, 26, 27, 0.12) 0px 3px 1px -2px;
}
body.body--dark .shadow-up-2 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -1px 5px,
    rgba(24, 26, 27, 0.14) 0px -2px 2px,
    rgba(24, 26, 27, 0.12) 0px -3px 1px -2px;
}
body.body--dark .shadow-3 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 1px 8px,
    rgba(24, 26, 27, 0.14) 0px 3px 4px,
    rgba(24, 26, 27, 0.12) 0px 3px 3px -2px;
}
body.body--dark .shadow-up-3 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -1px 8px,
    rgba(24, 26, 27, 0.14) 0px -3px 4px,
    rgba(24, 26, 27, 0.12) 0px -3px 3px -2px;
}
body.body--dark .shadow-4 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 2px 4px -1px,
    rgba(24, 26, 27, 0.14) 0px 4px 5px,
    rgba(24, 26, 27, 0.12) 0px 1px 10px;
}
body.body--dark .shadow-up-4 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -2px 4px -1px,
    rgba(24, 26, 27, 0.14) 0px -4px 5px,
    rgba(24, 26, 27, 0.12) 0px -1px 10px;
}
body.body--dark .shadow-5 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 3px 5px -1px,
    rgba(24, 26, 27, 0.14) 0px 5px 8px,
    rgba(24, 26, 27, 0.12) 0px 1px 14px;
}
body.body--dark .shadow-up-5 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -3px 5px -1px,
    rgba(24, 26, 27, 0.14) 0px -5px 8px,
    rgba(24, 26, 27, 0.12) 0px -1px 14px;
}
body.body--dark .shadow-6 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 3px 5px -1px,
    rgba(24, 26, 27, 0.14) 0px 6px 10px,
    rgba(24, 26, 27, 0.12) 0px 1px 18px;
}
body.body--dark .shadow-up-6 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -3px 5px -1px,
    rgba(24, 26, 27, 0.14) 0px -6px 10px,
    rgba(24, 26, 27, 0.12) 0px -1px 18px;
}
body.body--dark .shadow-7 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 4px 5px -2px,
    rgba(24, 26, 27, 0.14) 0px 7px 10px 1px,
    rgba(24, 26, 27, 0.12) 0px 2px 16px 1px;
}
body.body--dark .shadow-up-7 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -4px 5px -2px,
    rgba(24, 26, 27, 0.14) 0px -7px 10px 1px,
    rgba(24, 26, 27, 0.12) 0px -2px 16px 1px;
}
body.body--dark .shadow-8 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 5px 5px -3px,
    rgba(24, 26, 27, 0.14) 0px 8px 10px 1px,
    rgba(24, 26, 27, 0.12) 0px 3px 14px 2px;
}
body.body--dark .shadow-up-8 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -5px 5px -3px,
    rgba(24, 26, 27, 0.14) 0px -8px 10px 1px,
    rgba(24, 26, 27, 0.12) 0px -3px 14px 2px;
}
body.body--dark .shadow-9 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 5px 6px -3px,
    rgba(24, 26, 27, 0.14) 0px 9px 12px 1px,
    rgba(24, 26, 27, 0.12) 0px 3px 16px 2px;
}
body.body--dark .shadow-up-9 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -5px 6px -3px,
    rgba(24, 26, 27, 0.14) 0px -9px 12px 1px,
    rgba(24, 26, 27, 0.12) 0px -3px 16px 2px;
}
body.body--dark .shadow-10 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 6px 6px -3px,
    rgba(24, 26, 27, 0.14) 0px 10px 14px 1px,
    rgba(24, 26, 27, 0.12) 0px 4px 18px 3px;
}
body.body--dark .shadow-up-10 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -6px 6px -3px,
    rgba(24, 26, 27, 0.14) 0px -10px 14px 1px,
    rgba(24, 26, 27, 0.12) 0px -4px 18px 3px;
}
body.body--dark .shadow-11 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 6px 7px -4px,
    rgba(24, 26, 27, 0.14) 0px 11px 15px 1px,
    rgba(24, 26, 27, 0.12) 0px 4px 20px 3px;
}
body.body--dark .shadow-up-11 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -6px 7px -4px,
    rgba(24, 26, 27, 0.14) 0px -11px 15px 1px,
    rgba(24, 26, 27, 0.12) 0px -4px 20px 3px;
}
body.body--dark .shadow-12 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 7px 8px -4px,
    rgba(24, 26, 27, 0.14) 0px 12px 17px 2px,
    rgba(24, 26, 27, 0.12) 0px 5px 22px 4px;
}
body.body--dark .shadow-up-12 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -7px 8px -4px,
    rgba(24, 26, 27, 0.14) 0px -12px 17px 2px,
    rgba(24, 26, 27, 0.12) 0px -5px 22px 4px;
}
body.body--dark .shadow-13 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 7px 8px -4px,
    rgba(24, 26, 27, 0.14) 0px 13px 19px 2px,
    rgba(24, 26, 27, 0.12) 0px 5px 24px 4px;
}
body.body--dark .shadow-up-13 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -7px 8px -4px,
    rgba(24, 26, 27, 0.14) 0px -13px 19px 2px,
    rgba(24, 26, 27, 0.12) 0px -5px 24px 4px;
}
body.body--dark .shadow-14 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 7px 9px -4px,
    rgba(24, 26, 27, 0.14) 0px 14px 21px 2px,
    rgba(24, 26, 27, 0.12) 0px 5px 26px 4px;
}
body.body--dark .shadow-up-14 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -7px 9px -4px,
    rgba(24, 26, 27, 0.14) 0px -14px 21px 2px,
    rgba(24, 26, 27, 0.12) 0px -5px 26px 4px;
}
body.body--dark .shadow-15 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 8px 9px -5px,
    rgba(24, 26, 27, 0.14) 0px 15px 22px 2px,
    rgba(24, 26, 27, 0.12) 0px 6px 28px 5px;
}
body.body--dark .shadow-up-15 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -8px 9px -5px,
    rgba(24, 26, 27, 0.14) 0px -15px 22px 2px,
    rgba(24, 26, 27, 0.12) 0px -6px 28px 5px;
}
body.body--dark .shadow-16 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 8px 10px -5px,
    rgba(24, 26, 27, 0.14) 0px 16px 24px 2px,
    rgba(24, 26, 27, 0.12) 0px 6px 30px 5px;
}
body.body--dark .shadow-up-16 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -8px 10px -5px,
    rgba(24, 26, 27, 0.14) 0px -16px 24px 2px,
    rgba(24, 26, 27, 0.12) 0px -6px 30px 5px;
}
body.body--dark .shadow-17 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 8px 11px -5px,
    rgba(24, 26, 27, 0.14) 0px 17px 26px 2px,
    rgba(24, 26, 27, 0.12) 0px 6px 32px 5px;
}
body.body--dark .shadow-up-17 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -8px 11px -5px,
    rgba(24, 26, 27, 0.14) 0px -17px 26px 2px,
    rgba(24, 26, 27, 0.12) 0px -6px 32px 5px;
}
body.body--dark .shadow-18 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 9px 11px -5px,
    rgba(24, 26, 27, 0.14) 0px 18px 28px 2px,
    rgba(24, 26, 27, 0.12) 0px 7px 34px 6px;
}
body.body--dark .shadow-up-18 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -9px 11px -5px,
    rgba(24, 26, 27, 0.14) 0px -18px 28px 2px,
    rgba(24, 26, 27, 0.12) 0px -7px 34px 6px;
}
body.body--dark .shadow-19 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 9px 12px -6px,
    rgba(24, 26, 27, 0.14) 0px 19px 29px 2px,
    rgba(24, 26, 27, 0.12) 0px 7px 36px 6px;
}
body.body--dark .shadow-up-19 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -9px 12px -6px,
    rgba(24, 26, 27, 0.14) 0px -19px 29px 2px,
    rgba(24, 26, 27, 0.12) 0px -7px 36px 6px;
}
body.body--dark .shadow-20 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 10px 13px -6px,
    rgba(24, 26, 27, 0.14) 0px 20px 31px 3px,
    rgba(24, 26, 27, 0.12) 0px 8px 38px 7px;
}
body.body--dark .shadow-up-20 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -10px 13px -6px,
    rgba(24, 26, 27, 0.14) 0px -20px 31px 3px,
    rgba(24, 26, 27, 0.12) 0px -8px 38px 7px;
}
body.body--dark .shadow-21 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 10px 13px -6px,
    rgba(24, 26, 27, 0.14) 0px 21px 33px 3px,
    rgba(24, 26, 27, 0.12) 0px 8px 40px 7px;
}
body.body--dark .shadow-up-21 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -10px 13px -6px,
    rgba(24, 26, 27, 0.14) 0px -21px 33px 3px,
    rgba(24, 26, 27, 0.12) 0px -8px 40px 7px;
}
body.body--dark .shadow-22 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 10px 14px -6px,
    rgba(24, 26, 27, 0.14) 0px 22px 35px 3px,
    rgba(24, 26, 27, 0.12) 0px 8px 42px 7px;
}
body.body--dark .shadow-up-22 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -10px 14px -6px,
    rgba(24, 26, 27, 0.14) 0px -22px 35px 3px,
    rgba(24, 26, 27, 0.12) 0px -8px 42px 7px;
}
body.body--dark .shadow-23 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 11px 14px -7px,
    rgba(24, 26, 27, 0.14) 0px 23px 36px 3px,
    rgba(24, 26, 27, 0.12) 0px 9px 44px 8px;
}
body.body--dark .shadow-up-23 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -11px 14px -7px,
    rgba(24, 26, 27, 0.14) 0px -23px 36px 3px,
    rgba(24, 26, 27, 0.12) 0px -9px 44px 8px;
}
body.body--dark .shadow-24 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px 11px 15px -7px,
    rgba(24, 26, 27, 0.14) 0px 24px 38px 3px,
    rgba(24, 26, 27, 0.12) 0px 9px 46px 8px;
}
body.body--dark .shadow-up-24 {
    box-shadow: rgba(24, 26, 27, 0.2) 0px -11px 15px -7px,
    rgba(24, 26, 27, 0.14) 0px -24px 38px 3px,
    rgba(24, 26, 27, 0.12) 0px -9px 46px 8px;
}
body.body--dark .inset-shadow {
    box-shadow: rgba(24, 26, 27, 0.7) 0px 7px 9px -7px inset;
}
body.body--dark .inset-shadow-down {
    box-shadow: rgba(24, 26, 27, 0.7) 0px -7px 9px -7px inset;
}
.no-shadow,
.shadow-0 {
    box-shadow: none !important;
}
.glossy {
    background-image: linear-gradient(rgba(24, 26, 27, 0.3),
    rgba(24, 26, 27, 0) 50%,
    rgba(0, 0, 0, 0.12) 51%,
    rgba(0, 0, 0, 0.04)) !important;
}
.q-placeholder::placeholder {
    color: inherit;
}
.q-link {
    outline-color: initial;
    text-decoration-color: initial;
}
.q-link--focusable:focus-visible {
    text-decoration-color: currentcolor;
}
:root {
    --q-size-xs: 0;
    --q-size-sm: 600px;
    --q-size-md: 1024px;
    --q-size-lg: 1440px;
    --q-size-xl: 1920px;
}
:root {
    --q-transition-duration: .3s;
}
.q-transition--slide-right-enter-active,
.q-transition--slide-right-leave-active,
.q-transition--slide-left-enter-active,
.q-transition--slide-left-leave-active,
.q-transition--slide-up-enter-active,
.q-transition--slide-up-leave-active,
.q-transition--slide-down-enter-active,
.q-transition--slide-down-leave-active,
.q-transition--jump-right-enter-active,
.q-transition--jump-right-leave-active,
.q-transition--jump-left-enter-active,
.q-transition--jump-left-leave-active,
.q-transition--jump-up-enter-active,
.q-transition--jump-up-leave-active,
.q-transition--jump-down-enter-active,
.q-transition--jump-down-leave-active,
.q-transition--fade-enter-active,
.q-transition--fade-leave-active,
.q-transition--scale-enter-active,
.q-transition--scale-leave-active,
.q-transition--rotate-enter-active,
.q-transition--rotate-leave-active,
.q-transition--flip-enter-active,
.q-transition--flip-leave-active {
    --q-transition-duration: .3s;
    --q-transition-easing: cubic-bezier(.215,.61,.355,1);
}
.text-strike {
    text-decoration-color: initial;
}
.no-border {
    border-color: initial !important;
}
.no-box-shadow {
    box-shadow: none !important;
}
.no-outline {
    outline-color: initial !important;
}
.disabled,
.disabled *,
[disabled],
[disabled] * {
    outline-color: initial !important;
}
.transparent {
    background-image: initial !important;
    background-color: transparent !important;
}
.dimmed::after {
    background-image: initial !important;
    background-color: rgba(0, 0, 0, 0.4) !important;
}
.light-dimmed::after {
    background-image: initial !important;
    background-color: rgba(24, 26, 27, 0.6) !important;
}
.q-focus-helper,
.q-focusable,
.q-manual-focusable,
.q-hoverable {
    outline-color: initial;
}
body.desktop .q-focus-helper::before {
    background-image: initial;
    background-color: rgb(0, 0, 0);
}
body.desktop .q-focus-helper::after {
    background-image: initial;
    background-color: rgb(24, 26, 27);
}
body.desktop .q-focusable:focus > .q-focus-helper,
body.desktop .q-manual-focusable--focused > .q-focus-helper,
body.desktop .q-hoverable:hover > .q-focus-helper {
    background-image: initial;
    background-color: currentcolor;
}
body.body--dark {
    color: rgb(232, 230, 227);
    background: var(--darkreader-bg--q-dark-page);
}
.q-dark {
    color: rgb(232, 230, 227);
    background: var(--darkreader-bg--q-dark);
}
*,
::before,
::after {
    border-color: rgb(54, 59, 61);
}
::before, ::after {
    --tw-content: "";
}
hr {
    color: inherit;
}
abbr:where([title]) {
    text-decoration-color: initial;
}
a {
    color: inherit; text-decoration-color: inherit;
}
table {
    border-color: inherit;
}
button, input, optgroup, select, textarea {
    color: inherit;
}
button, [type="button"], [type="reset"], [type="submit"] {
    background-color: transparent;
    background-image: none;
}
ol,
ul,
menu {
    list-style-image: initial;
}
input::placeholder,
textarea::placeholder {
    color: rgb(175, 169, 158);
}
*,
::before,
::after {
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-scroll-snap-strictness: proximity;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(59 130 246 / .5);
    --darkreader-bg--tw-ring-offset-shadow: 0 0 #0000;
    --darkreader-bg--tw-ring-shadow: 0 0 #0000;
    --darkreader-bg--tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
}
::backdrop {
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-scroll-snap-strictness: proximity;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(59 130 246 / .5);
    --darkreader-bg--tw-ring-offset-shadow: 0 0 #0000;
    --darkreader-bg--tw-ring-shadow: 0 0 #0000;
    --darkreader-bg--tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
}
.tw-border-\[\#dadce0\] {
    --darkreader-border--tw-border-opacity: 1;
    border-color: rgb(58, 62, 65);
}
.tw-border-danger {
    --darkreader-border--tw-border-opacity: 1;
    border-color: rgb(171, 33, 23);
}
.tw-border-danger-3 {
    --darkreader-border--tw-border-opacity: 1;
    border-color: rgb(130, 12, 3);
}
.tw-border-dark {
    --darkreader-border--tw-border-opacity: 1;
    border-color: rgb(118, 110, 97);
}
.tw-border-primary {
    --darkreader-border--tw-border-opacity: 1;
    border-color: rgb(18, 93, 158);
}
.tw-border-primary-3 {
    --darkreader-border--tw-border-opacity: 1;
    border-color: rgb(20, 70, 115);
}
.tw-border-primary-dark {
    --darkreader-border--tw-border-opacity: 1;
    border-color: rgb(11, 105, 189);
}
.tw-border-secondary-2 {
    --darkreader-border--tw-border-opacity: 1;
    border-color: rgb(42, 40, 77);
}
.tw-border-secondary-3 {
    --darkreader-border--tw-border-opacity: 1;
    border-color: rgb(73, 79, 82);
}
.tw-border-secondary-4 {
    --darkreader-border--tw-border-opacity: 1;
    border-color: rgb(98, 91, 81);
}
.tw-bg-danger-2 {
    --darkreader-bg--tw-bg-opacity: 1;
    background-color: rgb(63, 17, 13);
}
.tw-bg-dark {
    --darkreader-bg--tw-bg-opacity: 1;
    background-color: rgb(50, 54, 56);
}
.tw-bg-inherit {
    background-color: inherit;
}
.tw-bg-primary {
    --darkreader-bg--tw-bg-opacity: 1;
    background-color: rgb(20, 105, 178);
}
.tw-bg-primary-2 {
    --darkreader-bg--tw-bg-opacity: 1;
    background-color: rgb(31, 33, 35);
}
.tw-bg-primary-3 {
    --darkreader-bg--tw-bg-opacity: 1;
    background-color: rgb(17, 61, 100);
}
.tw-bg-primary-dark-2 {
    --darkreader-bg--tw-bg-opacity: 1;
    background-color: rgb(6, 92, 168);
}
.tw-bg-secondary {
    --darkreader-bg--tw-bg-opacity: 1;
    background-color: rgb(29, 32, 33);
}
.tw-bg-secondary-2 {
    --darkreader-bg--tw-bg-opacity: 1;
    background-color: rgb(37, 40, 42);
}
.tw-bg-secondary-5 {
    --darkreader-bg--tw-bg-opacity: 1;
    background-color: rgb(34, 37, 38);
}
.tw-bg-white {
    --darkreader-bg--tw-bg-opacity: 1;
    background-color: rgb(24, 26, 27);
}
.tw-bg-gradient-to-b {
    background-image: linear-gradient(to bottom,
    var(--darkreader-bg--tw-gradient-stops));
}
.tw-from-\[\#6E4584\] {
    --darkreader-bg--tw-gradient-from: #6E4584 var(--darkreader-bg--tw-gradient-from-position);
    --darkreader-bg--tw-gradient-to: #181a1b;
    --darkreader-bg--tw-gradient-stops: var(--darkreader-bg--tw-gradient-from),
    var(--darkreader-bg--tw-gradient-to);
}
.tw-from-\[\#F9EBEB\] {
    --darkreader-bg--tw-gradient-from: #F9EBEB var(--darkreader-bg--tw-gradient-from-position);
    --darkreader-bg--tw-gradient-to: #181a1b;
    --darkreader-bg--tw-gradient-stops: var(--darkreader-bg--tw-gradient-from),
    var(--darkreader-bg--tw-gradient-to);
}
.tw-to-\[\#48416C\] {
    --darkreader-bg--tw-gradient-to: #48416C var(--darkreader-bg--tw-gradient-to-position);
}
.tw-to-\[\#CBD5E1\] {
    --darkreader-bg--tw-gradient-to: #CBD5E1 var(--darkreader-bg--tw-gradient-to-position);
}
.\!tw-text-dark {
    --darkreader-text--tw-text-opacity: 1 !important;
    color: rgb(190, 184, 176) !important;
}
.tw-text-black {
    --darkreader-text--tw-text-opacity: 1;
    color: rgb(232, 230, 227);
}
.tw-text-danger {
    --darkreader-text--tw-text-opacity: 1;
    color: rgb(232, 94, 84);
}
.tw-text-dark {
    --darkreader-text--tw-text-opacity: 1;
    color: rgb(190, 184, 176);
}
.tw-text-fb-blue {
    --darkreader-text--tw-text-opacity: 1;
    color: rgb(66, 152, 239);
}
.tw-text-primary {
    --darkreader-text--tw-text-opacity: 1;
    color: rgb(54, 155, 232);
}
.tw-text-primary-dark {
    --darkreader-text--tw-text-opacity: 1;
    color: rgb(102, 183, 246);
}
.tw-text-primary-dark-2 {
    --darkreader-text--tw-text-opacity: 1;
    color: rgb(80, 175, 249);
}
.tw-text-red-300 {
    --darkreader-text--tw-text-opacity: 1;
    color: rgb(251, 143, 143);
}
.tw-text-red-500 {
    --darkreader-text--tw-text-opacity: 1;
    color: rgb(240, 77, 77);
}
.tw-text-red-600 {
    --darkreader-text--tw-text-opacity: 1;
    color: rgb(223, 59, 59);
}
.tw-text-secondary-3 {
    --darkreader-text--tw-text-opacity: 1;
    color: rgb(176, 169, 159);
}
.tw-text-secondary-4 {
    --darkreader-text--tw-text-opacity: 1;
    color: rgb(152, 143, 129);
}
.tw-text-secondary-6 {
    --darkreader-text--tw-text-opacity: 1;
    color: rgb(172, 165, 154);
}
.tw-text-warning {
    --darkreader-text--tw-text-opacity: 1;
    color: rgb(235, 154, 60);
}
.tw-text-white {
    --darkreader-text--tw-text-opacity: 1;
    color: rgb(232, 230, 227);
}
.tw-shadow-lg {
    --darkreader-bg--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1),
    0 4px 6px -4px rgb(0 0 0 / .1);
    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
    0 4px 6px -4px var(--tw-shadow-color);
    box-shadow: var(--darkreader-bg--tw-ring-offset-shadow, 0 0 #0000),
    var(--darkreader-bg--tw-ring-shadow,
    0 0 rgba(0, 0, 0, 0)),
    var(--darkreader-bg--tw-shadow);
}
.tw-shadow-xl {
    --darkreader-bg--tw-shadow: 0 20px 25px -5px rgb(0 0 0 / .1),
    0 8px 10px -6px rgb(0 0 0 / .1);
    --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color),
    0 8px 10px -6px var(--tw-shadow-color);
    box-shadow: var(--darkreader-bg--tw-ring-offset-shadow, 0 0 #0000),
    var(--darkreader-bg--tw-ring-shadow,
    0 0 rgba(0, 0, 0, 0)),
    var(--darkreader-bg--tw-shadow);
}
.text-info {
    color: rgb(102, 183, 246) !important;
}
.bg-info {
    background-image: initial !important;
    background-color: rgb(8, 78, 140) !important;
}
.text-warn {
    color: rgb(247, 163, 65) !important;
}
.bg-warn {
    background-image: initial !important;
    background-color: rgb(170, 95, 8) !important;
}
.text-error {
    color: rgb(239, 49, 56) !important;
}
.bg-error {
    background-image: initial !important;
    background-color: rgb(183, 15, 21) !important;
}
.text-success {
    color: rgb(82, 211, 122) !important;
}
.bg-success {
    background-image: initial !important;
    background-color: rgb(38, 151, 74) !important;
}
.hover\:tw-bg-danger-3:hover {
    --darkreader-bg--tw-bg-opacity: 1;
    background-color: rgb(110, 10, 2);
}
.hover\:tw-bg-primary-3:hover {
    --darkreader-bg--tw-bg-opacity: 1;
    background-color: rgb(17, 61, 100);
}
.hover\:tw-bg-primary-dark:hover {
    --darkreader-bg--tw-bg-opacity: 1;
    background-color: rgb(8, 78, 140);
}
.hover\:tw-bg-primary-dark-2:hover {
    --darkreader-bg--tw-bg-opacity: 1;
    background-color: rgb(6, 92, 168);
}
.hover\:tw-bg-secondary:hover {
    --darkreader-bg--tw-bg-opacity: 1;
    background-color: rgb(29, 32, 33);
}
.hover\:tw-bg-secondary-2:hover {
    --darkreader-bg--tw-bg-opacity: 1;
    background-color: rgb(37, 40, 42);
}
.hover\:tw-text-danger:hover {
    --darkreader-text--tw-text-opacity: 1;
    color: rgb(232, 94, 84);
}
.hover\:tw-text-primary:hover {
    --darkreader-text--tw-text-opacity: 1;
    color: rgb(54, 155, 232);
}
.hover\:tw-shadow-md:hover {
    --darkreader-bg--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / .1),
    0 2px 4px -2px rgb(0 0 0 / .1);
    --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color),
    0 2px 4px -2px var(--tw-shadow-color);
    box-shadow: var(--darkreader-bg--tw-ring-offset-shadow, 0 0 #0000),
    var(--darkreader-bg--tw-ring-shadow,
    0 0 rgba(0, 0, 0, 0)),
    var(--darkreader-bg--tw-shadow);
}
.disabled\:tw-border-secondary-3:disabled {
    --darkreader-border--tw-border-opacity: 1;
    border-color: rgb(73, 79, 82);
}
.disabled\:tw-bg-secondary-3:disabled {
    --darkreader-bg--tw-bg-opacity: 1;
    background-color: rgb(74, 80, 84);
}
@media (min-width: 640px) {
    .sm\:tw-text-dark {
        --darkreader-text--tw-text-opacity: 1;
        color: rgb(190, 184, 176);
    }
}
.qJTHM {
    color: rgb(211, 207, 201);
}
.hSRGPd {
    color: rgb(48, 146, 234);
    text-decoration-color: initial;
}
.S9gUrf-YoZ4jf,
.S9gUrf-YoZ4jf * {
    border-color: initial;
}
.fFW7wc-ibnC6b > .aZ2wEe > div {
    border-color: rgb(9, 63, 153);
}
.P1ekSe-ZMv3u > div:nth-child(1) {
    background-color: rgb(18, 90, 184) !important;
}
.P1ekSe-ZMv3u > div:nth-child(2),
.P1ekSe-ZMv3u > div:nth-child(3) {
    background-image: linear-gradient(to right,
    rgba(24, 26, 27, 0.7),
    rgba(24, 26, 27, 0.7)),
    linear-gradient(to right,
    rgb(18, 90, 184),
    rgb(18, 90, 184)) !important;
}
.nsm7Bb-HzV7m-LgbsSe {
    background-color: rgb(24, 26, 27);
    background-image: none;
    border-color: rgb(58, 62, 65);
    color: rgb(192, 186, 178);
    outline-color: initial;
}
@media screen and (-ms-high-contrast:active) {
    .nsm7Bb-HzV7m-LgbsSe {
        border-color: rgb(140, 130, 115);
        color: rgb(232, 230, 227);
    }
}
.nsm7Bb-HzV7m-LgbsSe.MFS4be-Ia7Qfc {
    border-color: initial;
    color: rgb(232, 230, 227);
}
.nsm7Bb-HzV7m-LgbsSe.MFS4be-v3pZbf-Ia7Qfc {
    background-color: rgb(18, 90, 184);
}
.nsm7Bb-HzV7m-LgbsSe.MFS4be-JaPV2b-Ia7Qfc {
    background-color: rgb(26, 28, 29);
    color: rgb(219, 216, 211);
}
.nsm7Bb-HzV7m-LgbsSe .nsm7Bb-HzV7m-LgbsSe-Bz112c-haAclf {
    background-color: rgb(24, 26, 27);
}
.nsm7Bb-HzV7m-LgbsSe:hover,
.nsm7Bb-HzV7m-LgbsSe:focus {
    box-shadow: none;
    border-color: rgb(7, 48, 109);
    outline-color: initial;
}
.nsm7Bb-HzV7m-LgbsSe:hover .nsm7Bb-HzV7m-LgbsSe-MJoBVe,
.nsm7Bb-HzV7m-LgbsSe:focus .nsm7Bb-HzV7m-LgbsSe-MJoBVe {
    background-image: initial;
    background-color: rgba(9, 67, 162, 0.04);
}
.nsm7Bb-HzV7m-LgbsSe:active .nsm7Bb-HzV7m-LgbsSe-MJoBVe {
    background-image: initial;
    background-color: rgba(9, 67, 162, 0.1);
}
.nsm7Bb-HzV7m-LgbsSe.MFS4be-Ia7Qfc:hover .nsm7Bb-HzV7m-LgbsSe-MJoBVe,
.nsm7Bb-HzV7m-LgbsSe.MFS4be-Ia7Qfc:focus .nsm7Bb-HzV7m-LgbsSe-MJoBVe {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.24);
}
.nsm7Bb-HzV7m-LgbsSe.MFS4be-Ia7Qfc:active .nsm7Bb-HzV7m-LgbsSe-MJoBVe {
    background-image: initial;
    background-color: rgba(24, 26, 27, 0.32);
}
.nsm7Bb-HzV7m-LgbsSe.jVeSEe .nsm7Bb-HzV7m-LgbsSe-BPrWId .K4efff {
    color: rgb(169, 162, 151);
    fill: rgb(169, 162, 151);
}
.nsm7Bb-HzV7m-LgbsSe.jVeSEe.MFS4be-Ia7Qfc .nsm7Bb-HzV7m-LgbsSe-BPrWId .K4efff {
    color: rgb(219, 216, 211);
    fill: rgb(219, 216, 211);
}
.L5Fo6c-sM5MNb {
    border-color: initial;
}
.L5Fo6c-bF1uUb:focus {
    border-color: initial;
    outline-color: initial;
}
#credential_picker_container {
    border-color: initial;
}
#credential_picker_container iframe {
    border-color: initial;
}
.L5Fo6c-sM5MNb {
    border-color: initial;
}
.L5Fo6c-bF1uUb:focus {
    border-color: initial;
    outline-color: initial;
}

/* Override Style */
.vimvixen-hint {
    background-color: #7b5300 !important;
    border-color: #d8b013 !important;
    color: #f3e8c8 !important;
}
#vimvixen-console-frame {
    color-scheme: light !important
}
::placeholder {
    opacity: 0.5 !important;
}
#edge-translate-panel-body,
.MuiTypography-body1,
.nfe-quote-text {
    color: var(--darkreader-neutral-text) !important;
}
gr-main-header {
    background-color: #0f3a48 !important;
}
.tou-z65h9k,
.tou-mignzq,
.tou-1b6i2ox,
.tou-lnqlqk {
    background-color: var(--darkreader-neutral-background) !important;
}
.tou-75mvi {
    background-color: #032029 !important;
}
.tou-ta9e87,
.tou-1w3fhi0,
.tou-1b8t2us,
.tou-py7lfi,
.tou-1lpmd9d,
.tou-1frrtv8,
.tou-17ezmgn {
    background-color: #0a0a0a !important;
}
.tou-uknfeu {
    background-color: #231603 !important;
}
.tou-6i3zyv {
    background-color: #19576c !important;
}
div.mermaid-viewer-control-panel .btn {
  fill: var(--darkreader-neutral-text);
  background-color: var(--darkreader-neutral-background);
}
svg g rect.er {
  fill: var(--darkreader-neutral-background) !important;
}
svg g rect.er.entityBox {
  fill: var(--darkreader-neutral-background) !important;
}
svg g rect.er.attributeBoxOdd {
  fill: var(--darkreader-neutral-background) !important;
}
svg g rect.er.attributeBoxEven {
  fill-opacity: 0.8 !important;
  fill: var(--darkreader-selection-background);
}
svg rect.er.relationshipLabelBox {
  fill: var(--darkreader-neutral-background) !important;
}
svg g g.nodes rect, svg g g.nodes polygon {
  fill: var(--darkreader-neutral-background) !important;
}
svg g rect.task {
  fill: var(--darkreader-selection-background) !important;
}
svg line.messageLine0, svg line.messageLine1 {
  stroke: var(--darkreader-neutral-text) !important;
}
div.mermaid .actor {
  fill: var(--darkreader-neutral-background) !important;
}
embed[type="application/pdf"][src="about:blank"] { filter: invert(100%) contrast(90%); } */
`;

document.head.appendChild(style);
