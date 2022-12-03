/**
  * All in one web searcher - v3.0
  * Default Search engines list
  **/

var searchEngines = {
    'Google' : {
        icon : 'https://www.google.com/favicon.ico',
        url : 'https://www.google.com/search?q=%s',
        sub :{
            'Web' : 'https://www.google.com/search?q=%s',
            'Images' : 'https://www.google.com/images?hl=en&source=imghp&q=%s',
            'Videos' : 'https://www.google.com/search?q=%s&tbm=vid',
            'News' : 'https://www.google.com/search?q=%s&tbs=nws:1',
            'Maps': 'https://maps.google.com/maps?q=%s',
            'Books': 'https://www.google.com/search?q=%s&tbs=bks:1',
            'Shopping': 'https://www.google.com/search?q=%s&tbm=shop',
            'Define': 'https://www.google.com/search?q=define:%s',
            'Translate': 'https://translate.google.com/translate_t?q=%s'
        }
    },
    
    'Bing' : {
        icon: 'https://www.bing.com/favicon.ico',
        url: 'https://bing.com/search?q=%s',
        sub:{
            'Web': 'https://bing.com/search?q=%s',
            'Images': 'https://www.bing.com/images/search?q=%s',
            'News': 'https://www.bing.com/news/search?q=%s',
            'Videos': 'https://www.bing.com/videos/search?q=%s',
            'Maps': 'https://www.bing.com/maps/?q=%s'
        }
    },
    
    'Yahoo' : {
        icon: 'https://www.yahoo.com/favicon.ico',
        url: 'https://search.yahoo.com/search?p=%s',
        sub :{
            'Web' : 'https://search.yahoo.com/search?p=%s',
            'Images' : 'https://images.search.yahoo.com/search/images?p=%s',
            'News' : 'https://news.search.yahoo.com/search/news?p=%s',
            'Videos' : 'https://video.search.yahoo.com/search/video?p=%s',
            'Answers' : 'https://answers.yahoo.com/search/search_result?p=%s',
            'Sports': 'https://sports.search.yahoo.com/search?p=%s'
        }
    },
    
    'DuckDuckGo' : {
        icon: 'https://duckduckgo.com/favicon.ico',
        url: 'https://duckduckgo.com/?q=%s'
    },
    
    'Wikipedia' : {
        icon: 'https://www.wikipedia.org/favicon.ico',
        url: 'https://www.wikipedia.org/w/index.php?search=%s',
        sub: {
            'Wikipedia': 'https://www.wikipedia.org/w/index.php?search=%s',
            'Dictionary': 'https://wiktionary.org/w/index.php?search=%s',
            'Wikinews': 'https://wikinews.org/w/index.php?search=%s'
        }
    },
    
    'Videos' : {
        icon: 'https://www.youtube.com/favicon.ico',
        url: 'https://www.google.com/search?q=%s&tbm=vid',
        sub: {
            'Youtube': 'https://www.youtube.com/results?search_query=%s',
            'Hulu': 'https://www.hulu.com/search?query=%s',
            'Dailymotion': 'https://www.dailymotion.com/relevance/search/%s',
            'Metacafe': 'https://www.metacafe.com/videos_about/%s',
            'Vimeo': 'https://vimeo.com/search?q=%s'
        }
    },
    
    'Twitter':{
        icon: 'https://twitter.com/favicon.ico',
        url: 'https://twitter.com/search?q=%s'
    },
    
    'WolframAlpha':{
        icon: 'https://www.wolframalpha.com/favicon.ico',
        url: 'https://www.wolframalpha.com/input/?i=%s'
    }
    
};

var sEngines = localStorage.getItem('aiows_searchEngines');
if( typeof localStorage['aiows_searchEngines'] !== 'undefined' && localStorage['aiows_searchEngines'] !== '' ){
    searchEngines = JSON.parse(sEngines);
}