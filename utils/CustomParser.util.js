export default CustomParser = (function () {
    // Private variables / properties
    const tags_replace = /<(?:.|\n)*?>/gm;


    //Public methods
    return {
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

        stripText: function (text) {
            return text.replace(tags_replace, '');
        }
    }
}());