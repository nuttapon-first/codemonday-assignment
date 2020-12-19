import _ from 'lodash'

export const dataServices = {
    addCommas,
    sortData
}


function sortData(inputArray, key, toggle) {
    if (toggle) {
        inputArray = _.sortBy(inputArray, key)
    } else {
        inputArray = _.reverse(_.sortBy(inputArray, key))
    }
    return inputArray
}

function addCommas(nStr) {
    nStr += ''
    var x = nStr.split('.')
    var x1 = x[0]
    var x2 = x.length > 1 ? '.' + x[1] : ''
    var rgx = /(\d+)(\d{3})/
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2')
    }
    return x1 + x2
}