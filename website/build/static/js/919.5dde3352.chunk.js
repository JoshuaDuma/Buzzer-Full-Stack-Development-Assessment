"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[919],{919:function(t,e,s){s.r(e),s.d(e,{default:function(){return u}});var i=s(671),a=s(144),l=s(326),n=s(340),o=s(347),r=s(791),c=s(504),d=s(184),u=function(t){(0,n.Z)(s,t);var e=(0,o.Z)(s);function s(t){var a;return(0,i.Z)(this,s),(a=e.call(this,t)).mtoM=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"],a.limit=25,a.page=1,a.state={error:null,isLoaded:!1,results:[],totalPosts:0,userId:window.location.pathname.split("/")[2]},a.loadFeed=a.loadFeed.bind((0,l.Z)(a)),a.loadMore=a.loadMore.bind((0,l.Z)(a)),a}return(0,a.Z)(s,[{key:"loadMore",value:function(){this.limit+=this.limit,this.loadFeed()}},{key:"componentDidMount",value:function(){this.setState({userId:window.location.pathname.split("/")[2]}),this.loadFeed()}},{key:"componentWillUnmount",value:function(){}},{key:"modifydate",value:function(t){var e,s=t.split("/");return e=s[0],this.mtoM[parseInt(s[1])-1]+" "+e+", "+s[2]}},{key:"loadFeed",value:function(){var t=this;fetch("https://buzzerapi.joshuaduma.ca/user/"+this.state.userId+"?limit="+this.limit).then((function(e){200===e.status?e.json().then((function(e){t.setState({results:e.results,totalPosts:e.hits})})):console.log("Looks like there was a problem. Status Code: "+e.status)})).catch((function(t){console.log("Fetch Error :-S",t)}))}},{key:"render",value:function(){var t=this;return(0,d.jsxs)("div",{className:"container border-right",children:[(0,d.jsx)("div",{className:"mb-2 h4",children:"Recent Posts"}),(0,d.jsxs)("ul",{className:"list-group list-group-flush",children:[this.state.results.map((function(e){return(0,d.jsx)("li",{className:"list-group-item",children:(0,d.jsxs)("div",{className:"row",children:[(0,d.jsx)("div",{className:"col-2",children:(0,d.jsx)(c.rU,{to:"/user/"+e.name+"?limit=25",children:(0,d.jsx)("img",{height:"50px",width:"75px",src:e.profile_pic,className:"img-fluid rounded-circle float-start p-2"})})}),(0,d.jsxs)("div",{className:"col-10",children:[(0,d.jsx)(c.rU,{to:"/user/"+e.name+"?limit=25",className:"fw-bold h5 card-title p-0 m-0 btn btn-none",children:e.name}),(0,d.jsxs)("span",{children:["- ",t.modifydate(e.date_posted)]}),(0,d.jsx)("p",{className:"card-text",children:e.post_content}),(0,d.jsx)("div",{className:"row row-cols-2 row-cols-lg-2 g-2 g-lg-3 clear-float",children:(0,d.jsx)("div",{className:"col",children:(0,d.jsxs)(c.rU,{to:"/user/"+e.name+"?limit=25",className:"p-0 btn btn-none text-muted disabled",children:[(0,d.jsx)("i",{className:"far fa-heart"})," ",e.likes]})})})]})]})},e._id)})),this.state.results.length<this.state.totalPosts&&(0,d.jsx)("div",{children:(0,d.jsx)("button",{className:"w-100 btn btn-outline-primary",onClick:this.loadMore,children:"Load More"})}),this.state.results.length>=this.state.totalPosts&&(0,d.jsx)("div",{className:" mt-3 text-center text-muted",children:"End of posts"})]})]})}}]),s}(r.Component)}}]);
//# sourceMappingURL=919.5dde3352.chunk.js.map