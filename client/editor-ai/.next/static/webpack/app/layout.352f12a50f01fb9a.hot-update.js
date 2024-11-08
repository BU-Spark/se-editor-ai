"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/layout",{

/***/ "(app-pages-browser)/./app/context/AuthContext.tsx":
/*!*************************************!*\
  !*** ./app/context/AuthContext.tsx ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AuthProvider: function() { return /* binding */ AuthProvider; },\n/* harmony export */   useAuth: function() { return /* binding */ useAuth; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _firebase_firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../firebase/firebase */ \"(app-pages-browser)/./app/firebase/firebase.ts\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/auth */ \"(app-pages-browser)/./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var node_modules_next_headers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! node_modules/next/headers */ \"(app-pages-browser)/./node_modules/next/dist/api/headers.js\");\n/* __next_internal_client_entry_do_not_use__ useAuth,AuthProvider auto */ \nvar _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\n\n\nconst AuthContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({});\nconst useAuth = ()=>{\n    _s();\n    return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(AuthContext);\n};\n_s(useAuth, \"gDsCjeeItUuvgOWf1v4qoK9RF6k=\");\nconst AuthProvider = (param)=>{\n    let { children } = param;\n    _s1();\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [userId, setUserId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    // useEffect(() => {\n    //   const unsubscribe = onAuthStateChanged(auth, (user) => {\n    //     setUser(user);\n    //   });\n    //   return () => unsubscribe();\n    // }, []);\n    // Function to update the user's display name\n    async function updateUserDisplayName(user, displayName) {\n        try {\n            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.updateProfile)(user, {\n                displayName: displayName\n            });\n            console.log(\"Display name updated successfully\");\n        } catch (error) {\n            console.error(\"Error updating display name:\", error);\n        }\n    }\n    // Function to update the user's password\n    async function updateUserPassword(user, newPassword) {\n        try {\n            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.updatePassword)(user, newPassword);\n            console.log(\"Password updated successfully\");\n        } catch (error) {\n            console.error(\"Error updating password:\", error);\n        }\n    }\n    const updateUser = (newDisplayName, newPassword)=>{\n        const user = _firebase_firebase__WEBPACK_IMPORTED_MODULE_2__.auth.currentUser;\n        if (user) {\n            updateUserDisplayName(user, newDisplayName);\n            updateUserPassword(user, newPassword);\n        }\n    };\n    const signUp = async (email, password, displayName)=>{\n        // try {\n        //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);\n        //     const user = userCredential.user;\n        //     await updateProfile(user, {\n        //       displayName: displayName\n        //     });\n        //     console.log(\"Sign up successful:\", user);\n        //     return true;\n        // } catch (error) {\n        //     // Handle sign up error\n        //     console.error(\"Sign up error:\", error);\n        //     return false;\n        // }\n        try {\n            const response = await fetch(\"http://127.0.0.1:5000/signup\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify({\n                    email,\n                    password,\n                    displayName\n                })\n            });\n            if (!response.ok) {\n                console.log(\"failed to sign up\");\n                // return response;\n                return false;\n            }\n            console.log(\"success\");\n            return true;\n        // redirect(\"/pages/login\");\n        // return {\"success\": true};\n        } catch (error) {\n            return false;\n        }\n    };\n    const signIn = async (email, password)=>{\n        try {\n            const response = await fetch(\"http://127.0.0.1:5000/login\", {\n                method: \"POST\",\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify({\n                    email,\n                    password\n                })\n            });\n            if (!response.ok) {\n                return false;\n            }\n            console.log(response);\n            const data = await response.json();\n            setUserId();\n            (0,node_modules_next_headers__WEBPACK_IMPORTED_MODULE_4__.cookies)().set(\"accessToken\", data.access_token);\n            return true;\n        } catch (error) {\n            console.log(error);\n            return false;\n        }\n    };\n    const signOut = ()=>{\n        return _firebase_firebase__WEBPACK_IMPORTED_MODULE_2__.auth.signOut();\n    };\n    const value = {\n        user,\n        userId,\n        signUp,\n        signIn,\n        signOut,\n        updateUser,\n        displayName: (user === null || user === void 0 ? void 0 : user.displayName) || \"\",\n        id: (user === null || user === void 0 ? void 0 : user.uid) || \"\"\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(AuthContext.Provider, {\n        value: value,\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/raymond/Desktop/EditorAI/client/editor-ai/app/context/AuthContext.tsx\",\n        lineNumber: 143,\n        columnNumber: 10\n    }, undefined);\n};\n_s1(AuthProvider, \"K+f346DNG4w+YAOm1IS3QCePXLk=\");\n_c = AuthProvider;\nvar _c;\n$RefreshReg$(_c, \"AuthProvider\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb250ZXh0L0F1dGhDb250ZXh0LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBRThFO0FBQ2xDO0FBQ3VHO0FBQy9GO0FBYXBELE1BQU1RLDRCQUFjUCxvREFBYUEsQ0FBbUIsQ0FBQztBQUU5QyxNQUFNUSxVQUFVOztJQUFNUCxPQUFBQSxpREFBVUEsQ0FBQ007QUFBVyxFQUFFO0dBQXhDQztBQUVOLE1BQU1DLGVBQXdEO1FBQUMsRUFBRUMsUUFBUSxFQUFFOztJQUNoRixNQUFNLENBQUNDLE1BQU1DLFFBQVEsR0FBR1YsK0NBQVFBLENBQWM7SUFDOUMsTUFBTSxDQUFDVyxRQUFRQyxVQUFVLEdBQUdaLCtDQUFRQSxDQUFnQjtJQUNwRCxvQkFBb0I7SUFDcEIsNkRBQTZEO0lBQzdELHFCQUFxQjtJQUNyQixRQUFRO0lBQ1IsZ0NBQWdDO0lBQ2hDLFVBQVU7SUFHViw2Q0FBNkM7SUFDN0MsZUFBZWEsc0JBQXNCSixJQUFTLEVBQUVLLFdBQWtCO1FBQ2hFLElBQUk7WUFDRixNQUFNWiw0REFBYUEsQ0FBQ08sTUFBTTtnQkFDeEJLLGFBQWFBO1lBQ2Y7WUFDQUMsUUFBUUMsR0FBRyxDQUFDO1FBQ2QsRUFBRSxPQUFPQyxPQUFPO1lBQ2RGLFFBQVFFLEtBQUssQ0FBQyxnQ0FBZ0NBO1FBQ2hEO0lBQ0Y7SUFFQSx5Q0FBeUM7SUFDekMsZUFBZUMsbUJBQW1CVCxJQUFTLEVBQUVVLFdBQWtCO1FBQzdELElBQUk7WUFDRixNQUFNaEIsNkRBQWNBLENBQUNNLE1BQU1VO1lBQzNCSixRQUFRQyxHQUFHLENBQUM7UUFDZCxFQUFFLE9BQU9DLE9BQU87WUFDZEYsUUFBUUUsS0FBSyxDQUFDLDRCQUE0QkE7UUFDNUM7SUFDRjtJQUVBLE1BQU1HLGFBQWEsQ0FBQ0MsZ0JBQXNCRjtRQUN4QyxNQUFNVixPQUFPUixvREFBSUEsQ0FBQ3FCLFdBQVc7UUFDN0IsSUFBSWIsTUFBTTtZQUNSSSxzQkFBc0JKLE1BQU1ZO1lBQzVCSCxtQkFBbUJULE1BQU1VO1FBQzNCO0lBQ0Y7SUFFQSxNQUFNSSxTQUFTLE9BQU9DLE9BQWVDLFVBQWtCWDtRQUNyRCxRQUFRO1FBQ1IsMEZBQTBGO1FBQzFGLHdDQUF3QztRQUV4QyxrQ0FBa0M7UUFDbEMsaUNBQWlDO1FBQ2pDLFVBQVU7UUFFVixnREFBZ0Q7UUFDaEQsbUJBQW1CO1FBQ25CLG9CQUFvQjtRQUNwQiw4QkFBOEI7UUFDOUIsOENBQThDO1FBQzlDLG9CQUFvQjtRQUNwQixJQUFJO1FBQ0osSUFBSTtZQUNGLE1BQU1ZLFdBQVcsTUFBTUMsTUFBTSxnQ0FBZ0M7Z0JBQ3pEQyxRQUFRO2dCQUNSQyxTQUFTO29CQUNMLGdCQUFnQjtnQkFDcEI7Z0JBQ0FDLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQztvQkFBRVI7b0JBQU9DO29CQUFVWDtnQkFBWTtZQUN4RDtZQUVBLElBQUksQ0FBQ1ksU0FBU08sRUFBRSxFQUFFO2dCQUNkbEIsUUFBUUMsR0FBRyxDQUFDO2dCQUNaLG1CQUFtQjtnQkFDbkIsT0FBTztZQUNYO1lBQ0FELFFBQVFDLEdBQUcsQ0FBQztZQUNaLE9BQU87UUFDUCw0QkFBNEI7UUFDNUIsNEJBQTRCO1FBQ2hDLEVBQUUsT0FBT0MsT0FBTztZQUNaLE9BQU87UUFDWDtJQUVGO0lBRUEsTUFBTWlCLFNBQVMsT0FBT1YsT0FBZUM7UUFDbkMsSUFBSTtZQUNGLE1BQU1DLFdBQVcsTUFBTUMsTUFBTSwrQkFBK0I7Z0JBQ3hEQyxRQUFRO2dCQUNSQyxTQUFTO29CQUNMLGdCQUFnQjtnQkFDcEI7Z0JBQ0FDLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQztvQkFBRVI7b0JBQU9DO2dCQUFTO1lBQzNDO1lBRUEsSUFBSSxDQUFDQyxTQUFTTyxFQUFFLEVBQUU7Z0JBQ2QsT0FBTztZQUNYO1lBQ0FsQixRQUFRQyxHQUFHLENBQUNVO1lBQ1osTUFBTVMsT0FBTyxNQUFNVCxTQUFTVSxJQUFJO1lBQ2hDeEI7WUFDQVIsa0VBQU9BLEdBQUdpQyxHQUFHLENBQUMsZUFBZUYsS0FBS0csWUFBWTtZQUM5QyxPQUFPO1FBQ1gsRUFBRSxPQUFPckIsT0FBTztZQUNkRixRQUFRQyxHQUFHLENBQUNDO1lBQ1YsT0FBTztRQUNYO0lBQ0E7SUFFRSxNQUFNc0IsVUFBVTtRQUNkLE9BQU90QyxvREFBSUEsQ0FBQ3NDLE9BQU87SUFDckI7SUFFQSxNQUFNQyxRQUEwQjtRQUM5Qi9CO1FBQ0FFO1FBQ0FZO1FBQ0FXO1FBQ0FLO1FBQ0FuQjtRQUNBTixhQUFhTCxDQUFBQSxpQkFBQUEsMkJBQUFBLEtBQU1LLFdBQVcsS0FBSTtRQUNsQzJCLElBQUloQyxDQUFBQSxpQkFBQUEsMkJBQUFBLEtBQU1pQyxHQUFHLEtBQUk7SUFDbkI7SUFFQSxxQkFBTyw4REFBQ3JDLFlBQVlzQyxRQUFRO1FBQUNILE9BQU9BO2tCQUFRaEM7Ozs7OztBQUM5QyxFQUFFO0lBekhXRDtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvY29udGV4dC9BdXRoQ29udGV4dC50c3g/OTliNyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XG5cbmltcG9ydCBSZWFjdCwgeyBjcmVhdGVDb250ZXh0LCB1c2VDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYXV0aCB9IGZyb20gJy4uL2ZpcmViYXNlL2ZpcmViYXNlJztcbmltcG9ydCB7IFVzZXIsIGNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZCwgc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQsIG9uQXV0aFN0YXRlQ2hhbmdlZCwgdXBkYXRlUHJvZmlsZSwgdXBkYXRlUGFzc3dvcmR9IGZyb20gJ2ZpcmViYXNlL2F1dGgnO1xuaW1wb3J0IHsgY29va2llcyB9IGZyb20gJ25vZGVfbW9kdWxlcy9uZXh0L2hlYWRlcnMnO1xuXG5pbnRlcmZhY2UgQXV0aENvbnRleHRQcm9wcyB7XG4gIHVzZXI6IFVzZXIgfCBudWxsO1xuICB1c2VySWQ6IHN0cmluZyB8IG51bGw7IC8vdGVtcFxuICBzaWduVXA6IChlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nLCBkaXNwbGF5TmFtZTogc3RyaW5nKSA9PiBQcm9taXNlPGFueT47XG4gIHNpZ25JbjogKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpID0+IE9iamVjdDtcbiAgc2lnbk91dDogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgdXBkYXRlVXNlcjogKG5ld0Rpc3BsYXlOYW1lOiBzdHJpbmcsIG5ld1Bhc3N3b3JkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGRpc3BsYXlOYW1lOiBzdHJpbmc7XG4gIGlkOiBzdHJpbmc7XG59XG5cbmNvbnN0IEF1dGhDb250ZXh0ID0gY3JlYXRlQ29udGV4dDxBdXRoQ29udGV4dFByb3BzPih7fSBhcyBBdXRoQ29udGV4dFByb3BzKTtcblxuZXhwb3J0IGNvbnN0IHVzZUF1dGggPSAoKSA9PiB1c2VDb250ZXh0KEF1dGhDb250ZXh0KTtcblxuZXhwb3J0IGNvbnN0IEF1dGhQcm92aWRlcjogUmVhY3QuRkM8eyBjaGlsZHJlbjogUmVhY3QuUmVhY3ROb2RlIH0+ID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xuICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZTxVc2VyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFt1c2VySWQsIHNldFVzZXJJZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgLy8gdXNlRWZmZWN0KCgpID0+IHtcbiAgLy8gICBjb25zdCB1bnN1YnNjcmliZSA9IG9uQXV0aFN0YXRlQ2hhbmdlZChhdXRoLCAodXNlcikgPT4ge1xuICAvLyAgICAgc2V0VXNlcih1c2VyKTtcbiAgLy8gICB9KTtcbiAgLy8gICByZXR1cm4gKCkgPT4gdW5zdWJzY3JpYmUoKTtcbiAgLy8gfSwgW10pO1xuXG5cbiAgLy8gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB1c2VyJ3MgZGlzcGxheSBuYW1lXG4gIGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVVzZXJEaXNwbGF5TmFtZSh1c2VyOlVzZXIsIGRpc3BsYXlOYW1lOnN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCB1cGRhdGVQcm9maWxlKHVzZXIsIHtcbiAgICAgICAgZGlzcGxheU5hbWU6IGRpc3BsYXlOYW1lXG4gICAgICB9KTtcbiAgICAgIGNvbnNvbGUubG9nKCdEaXNwbGF5IG5hbWUgdXBkYXRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgdXBkYXRpbmcgZGlzcGxheSBuYW1lOicsIGVycm9yKTtcbiAgICB9XG4gIH1cbiAgXG4gIC8vIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdXNlcidzIHBhc3N3b3JkXG4gIGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVVzZXJQYXNzd29yZCh1c2VyOlVzZXIsIG5ld1Bhc3N3b3JkOnN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCB1cGRhdGVQYXNzd29yZCh1c2VyLCBuZXdQYXNzd29yZCk7XG4gICAgICBjb25zb2xlLmxvZygnUGFzc3dvcmQgdXBkYXRlZCBzdWNjZXNzZnVsbHknKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgdXBkYXRpbmcgcGFzc3dvcmQ6JywgZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHVwZGF0ZVVzZXIgPSAobmV3RGlzcGxheU5hbWU6c3RyaW5nLG5ld1Bhc3N3b3JkOnN0cmluZykgPT4ge1xuICAgIGNvbnN0IHVzZXIgPSBhdXRoLmN1cnJlbnRVc2VyO1xuICAgIGlmICh1c2VyKSB7XG4gICAgICB1cGRhdGVVc2VyRGlzcGxheU5hbWUodXNlciwgbmV3RGlzcGxheU5hbWUpO1xuICAgICAgdXBkYXRlVXNlclBhc3N3b3JkKHVzZXIsIG5ld1Bhc3N3b3JkKTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBzaWduVXAgPSBhc3luYyAoZW1haWw6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZywgZGlzcGxheU5hbWU6c3RyaW5nKSA9PiB7XG4gICAgLy8gdHJ5IHtcbiAgICAvLyAgICAgY29uc3QgdXNlckNyZWRlbnRpYWwgPSBhd2FpdCBjcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQoYXV0aCwgZW1haWwsIHBhc3N3b3JkKTtcbiAgICAvLyAgICAgY29uc3QgdXNlciA9IHVzZXJDcmVkZW50aWFsLnVzZXI7XG5cbiAgICAvLyAgICAgYXdhaXQgdXBkYXRlUHJvZmlsZSh1c2VyLCB7XG4gICAgLy8gICAgICAgZGlzcGxheU5hbWU6IGRpc3BsYXlOYW1lXG4gICAgLy8gICAgIH0pO1xuXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKFwiU2lnbiB1cCBzdWNjZXNzZnVsOlwiLCB1c2VyKTtcbiAgICAvLyAgICAgcmV0dXJuIHRydWU7XG4gICAgLy8gfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyAgICAgLy8gSGFuZGxlIHNpZ24gdXAgZXJyb3JcbiAgICAvLyAgICAgY29uc29sZS5lcnJvcihcIlNpZ24gdXAgZXJyb3I6XCIsIGVycm9yKTtcbiAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xuICAgIC8vIH1cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMC9zaWdudXBcIiwge1xuICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICB9LFxuICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZW1haWwsIHBhc3N3b3JkLCBkaXNwbGF5TmFtZSB9KSxcbiAgICAgIH0pO1xuICBcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcImZhaWxlZCB0byBzaWduIHVwXCIpXG4gICAgICAgICAgLy8gcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKFwic3VjY2Vzc1wiKVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAvLyByZWRpcmVjdChcIi9wYWdlcy9sb2dpblwiKTtcbiAgICAgIC8vIHJldHVybiB7XCJzdWNjZXNzXCI6IHRydWV9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIFxufTtcblxuY29uc3Qgc2lnbkluID0gYXN5bmMgKGVtYWlsOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiaHR0cDovLzEyNy4wLjAuMTo1MDAwL2xvZ2luXCIsIHtcbiAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZW1haWwsIHBhc3N3b3JkIH0pLFxuICAgIH0pO1xuXG4gICAgaWYgKCFyZXNwb25zZS5vaykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIHNldFVzZXJJZCgpXG4gICAgY29va2llcygpLnNldChcImFjY2Vzc1Rva2VuXCIsIGRhdGEuYWNjZXNzX3Rva2VuKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn0gY2F0Y2ggKGVycm9yKSB7XG4gIGNvbnNvbGUubG9nKGVycm9yKVxuICAgIHJldHVybiBmYWxzZTtcbn1cbn07XG5cbiAgY29uc3Qgc2lnbk91dCA9ICgpID0+IHtcbiAgICByZXR1cm4gYXV0aC5zaWduT3V0KCk7XG4gIH07XG5cbiAgY29uc3QgdmFsdWU6IEF1dGhDb250ZXh0UHJvcHMgPSB7XG4gICAgdXNlcixcbiAgICB1c2VySWQsXG4gICAgc2lnblVwLFxuICAgIHNpZ25JbixcbiAgICBzaWduT3V0LFxuICAgIHVwZGF0ZVVzZXIsXG4gICAgZGlzcGxheU5hbWU6IHVzZXI/LmRpc3BsYXlOYW1lIHx8ICcnLFxuICAgIGlkOiB1c2VyPy51aWQgfHwgJydcbiAgfTtcblxuICByZXR1cm4gPEF1dGhDb250ZXh0LlByb3ZpZGVyIHZhbHVlPXt2YWx1ZX0+e2NoaWxkcmVufTwvQXV0aENvbnRleHQuUHJvdmlkZXI+O1xufTtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsImNyZWF0ZUNvbnRleHQiLCJ1c2VDb250ZXh0IiwidXNlU3RhdGUiLCJhdXRoIiwidXBkYXRlUHJvZmlsZSIsInVwZGF0ZVBhc3N3b3JkIiwiY29va2llcyIsIkF1dGhDb250ZXh0IiwidXNlQXV0aCIsIkF1dGhQcm92aWRlciIsImNoaWxkcmVuIiwidXNlciIsInNldFVzZXIiLCJ1c2VySWQiLCJzZXRVc2VySWQiLCJ1cGRhdGVVc2VyRGlzcGxheU5hbWUiLCJkaXNwbGF5TmFtZSIsImNvbnNvbGUiLCJsb2ciLCJlcnJvciIsInVwZGF0ZVVzZXJQYXNzd29yZCIsIm5ld1Bhc3N3b3JkIiwidXBkYXRlVXNlciIsIm5ld0Rpc3BsYXlOYW1lIiwiY3VycmVudFVzZXIiLCJzaWduVXAiLCJlbWFpbCIsInBhc3N3b3JkIiwicmVzcG9uc2UiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsIm9rIiwic2lnbkluIiwiZGF0YSIsImpzb24iLCJzZXQiLCJhY2Nlc3NfdG9rZW4iLCJzaWduT3V0IiwidmFsdWUiLCJpZCIsInVpZCIsIlByb3ZpZGVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/context/AuthContext.tsx\n"));

/***/ })

});