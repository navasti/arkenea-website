
export default function (Twig) {
  return [
    {
      name: 'widows',
      func: function (str) {
        if (str !== undefined) {
          var wordArray = str.split(' ')
          var strMod = ''
          for (var i = 0; i < wordArray.length; i++) {
            if (i != wordArray.length - 1) {
              if (wordArray[i].length == 1) strMod += (wordArray[i] + '&nbsp;')
              else strMod += (wordArray[i] + ' ')
            } else {
              strMod += wordArray[i]
            }
          }
          return strMod
        }
        return str
      }
    }
  ]
}
