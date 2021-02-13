'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');
  
  const targetArticle = document.querySelector(articleSelector);

  targetArticle.classList.add('active');
}

function generateTitleLinks(customSelector = ''){

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';

  for(let article of articles){
  
    const articleId = article.getAttribute('id');

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    

    html = html + linkHTML;
  }
  
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(){

  const params = {max: 0, min: 9999};

  for(let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
      } 
      if (tags[tag] < params.min){
        params.min = tags[tag];
      }
    }
    return params;
  }   



function generateTags(){

  let allTags = {};

  const articles = document.querySelectorAll(optArticleSelector);
  
  for(let article of articles){

    const tagsWrapper = article.querySelector(optArticleTagsSelector);

    let html = '';

    const articleTags = article.getAttribute('data-tags');

    const articleTagsArray = articleTags.split(' ');


    for(let tag of articleTagsArray){

      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
     
      html = html + linkHTML;

      if(!allTags.hasOwnProperty(tag)){
      
        allTags[tag] = 1;
        } else {
        allTags[tag]++;
      }
    }

    tagsWrapper.innerHTML = html;
  }
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);

  let allTagsHTML = '';

  for(let tag in allTags){
    allTagsHTML += '<a href="#tag-'+ tag + '">' + tag + ' (' + allTags[tag] + ') ' + '</a>';
  }
  tagList.innerHTML = allTagsHTML;
}

generateTags();

function tagClickHandler(event){
  
  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');
  
  const tag = href.replace('#tag-', '');
  
  const activeTagsLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  for(let activeTagLink of activeTagsLinks){
    
    activeTagLink.classList.remove('active');
  }
  
  const foundTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  
  for(let foundTagLink of foundTagLinks){

    clickedElement.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
  
}

function addClickListenersToTags(){

  const linkTags = document.querySelectorAll('a[href^="#tag-"]');

  for(let linkTag of linkTags){
  
    linkTag.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

function generateAuthors(){
 
  const articles = document.querySelectorAll(optArticleSelector);

  for(let article of articles){

    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    
    let html = '';

    const articleAuthor = article.getAttribute('data-author');
    
    const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
   
    html = html + linkHTML;

    authorsWrapper.innerHTML = html;
  }
}

generateAuthors();

function authorClickHandler(event){

  event.preventDefault();

  const clickedElement = this;

  const href = clickedElement.getAttribute('href');

  const author = href.replace('#author-', '');
  
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  for(let activeAuthorLink of activeAuthorLinks){
    
    activeAuthorLink.classList.remove('active');
  }

  const foundAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  

  for(let foundAuthorLink of foundAuthorLinks){
    
    clickedElement.classList.add('active');
  }
 
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){
  
  const linkAuthors = document.querySelectorAll('a[href^="#author-"]');
  
  for(let linkAuthor of linkAuthors){
   
    linkAuthor.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
