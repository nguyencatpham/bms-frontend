(this["webpackJsonpvisual-builder-react-cra"]=this["webpackJsonpvisual-builder-react-cra"]||[]).push([[22],{394:function(e,a,s){},551:function(e,a,s){"use strict";s.r(a);var c=s(1),i=s(11),r=s(39),l=(s(0),s(146)),t=s(27),d=s(32),n=s(561),j=s(562),o=s(60),h=(s(394),n.a.Item);a.default=Object(d.i)(Object(t.c)((function(e){var a=e.device,s=e.user,c=e.dispatch;return{loading:a.loading,detail:a.detail,role:s.role,userId:s.id,dispatch:c}}))((function(e){e.userId;var a=e.dispatch,s=Object(d.g)(),t=n.a.useForm(),b=Object(r.a)(t,1)[0];return Object(c.jsx)(c.Fragment,{children:Object(c.jsxs)("div",{className:"detail-page device-create-page",children:[Object(c.jsx)(l.a,{title:"Thi\u1ebft b\u1ecb | T\u1ea1o m\u1edbi"}),Object(c.jsx)("div",{className:"card-content",children:Object(c.jsx)("div",{className:"card-bg detail-form-wrap",children:Object(c.jsxs)(n.a,{className:"detail-form",onFinish:function(e){delete e.role,delete e.confirm,a({type:"authDevice/CREATE",payload:{body:[Object(i.a)({},e)]}})},form:b,children:[Object(c.jsx)(h,{className:"display-grid grid-row",name:"uuid",label:"UUID",rules:[{required:!0,message:"Vui l\xf2ng nh\u1eadp UUID!"},{max:256,message:"UUID qu\xe1 d\xe0i!"}],children:Object(c.jsx)(j.a,{placeholder:"Nh\u1eadp UUID"})}),Object(c.jsx)(h,{className:"display-grid grid-row",name:"macAddress",label:"\u0110\u1ecba ch\u1ec9 Mac",rules:[{required:!0,message:"Vui l\xf2ng nh\u1eadp \u0111\u1ecba ch\u1ec9 mac address!"}],children:Object(c.jsx)(j.a,{placeholder:"Nh\u1eadp \u0111\u1ecba ch\u1ec9 MAC..."})}),Object(c.jsx)(h,{className:"display-grid grid-row",name:"serialId",label:"Serial",rules:[{required:!0,message:"Vui l\xf2ng nh\u1eadp Serial!"}],children:Object(c.jsx)(j.a,{placeholder:"Nh\u1eadp Serial..."})}),Object(c.jsx)(h,{className:"display-grid grid-row",name:"model",label:"Model",rules:[{required:!0,message:"Vui l\xf2ng nh\u1eadp model!"}],children:Object(c.jsx)(j.a,{placeholder:"Nh\u1eadp model..."})}),Object(c.jsxs)("div",{className:"text-right fl-right btn-footer btn-group-footer",children:[Object(c.jsxs)(o.a,{type:"dashed",onClick:function(){return s.push("/devices")},children:[Object(c.jsx)("i",{className:"i_cancel ico25"}),Object(c.jsx)("strong",{children:"H\u1ee7y"})]}),Object(c.jsxs)(o.a,{type:"primary",style:{marginLeft:10},htmlType:"submit",children:[Object(c.jsx)("i",{className:"i_save_36 ico25"}),Object(c.jsx)("strong",{children:"L\u01b0u"})]})]})]})})})]})})})))}}]);