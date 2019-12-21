from bs4 import BeautifulSoup as bs
import requests
import json

url = {
'everyone': 'http://siliconvalleyism.com/silicon-valley-quotes.php',
'richard':'http://siliconvalleyism.com/silicon-valley-richard-quotes.php',
'erlich':'http://siliconvalleyism.com/silicon-valley-erlich-quotes.php',
'dinesh':'http://siliconvalleyism.com/silicon-valley-dinesh-quotes.php',
'gilfoyle':'http://siliconvalleyism.com/silicon-valley-gilfoyle-quotes.php',
'jared':'http://siliconvalleyism.com/silicon-valley-jared-quotes.php',
'bighead':'http://siliconvalleyism.com/silicon-valley-big-head-quotes.php',
'monica':'http://siliconvalleyism.com/silicon-valley-monica-quotes.php',
'russ':'http://siliconvalleyism.com/silicon-valley-russ-hanneman-quotes.php',
'gavin':'http://siliconvalleyism.com/silicon-valley-gavin-belson-quotes.php',
'peter':'http://siliconvalleyism.com/silicon-valley-gavin-belson-quotes.php',
'jianyang':'http://siliconvalleyism.com/silicon-valley-jian-yang-quotes.php',
'laurie ':'http://siliconvalleyism.com/silicon-valley-laurie-bream-quotes.php',
}
# loops over each link to get content where 'p' tag has class 'quote'
for link in url:
    quotes_json={}
    parse = url.get(link)
    response=requests.get(parse,timeout=5)
    content=bs(response.content,'html.parser') # gets the complete html doc
    ptags=content.find_all('p', attrs={'class':'quote'}) # selects only ptags
    for br in content.find_all("br"):   # change all line break tags to new line
        br.replace_with("\n")

    for i, ptag in enumerate(ptags):  # loop over each atagchild to get text
        atagsChildren=ptag.findChildren("a",recursive=False)
        print("")
        print (atagsChildren[0].get_text())

        # json to save scraped quotes
        quotes_json.update({
            i:atagsChildren[0].get_text()
        })
        print(quotes_json)
    file_name = link+'.json'
    with open(file_name, 'w') as outfile:
        json.dump(quotes_json, outfile)
