/**
 * Class with utilities to handle string (Module pattern)
 */
export default CustomParser = (function () {

    // Private variables
    const tags_replace = /<(?:.|\n)*?>/gm;


    //Public methods
    return {
        /**
         * Function that crop text depends of the length you want
         *
         * @param text
         * @param size
         * @returns {*}
         */
        cropText: function (text, size) {
            let x = text;
            if (text) {
                if (text.length > size - 1) {
                    return x.substring(0, size) + "...";

                } else {
                    return text;
                }
            }
        },
        /**
         * Funtion to remove html tags
         *
         * @param text
         * @returns {string|*|XML|void}
         */
        stripText: function (text) {
            return text.replace(tags_replace, '');
        }
    }
}());