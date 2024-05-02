import {
  useCallback, //   useEffect,
  //   useState, //Fragment, createContext,  useContext,  useMemo
} from "react";

// import {
//   //STORE_SAVE_EVENT,
//   createClient,
// } from "@w3ui/core";

// import { createComponent, createElement } from "ariakit-react-utils";

// export * from "@w3ui/core";

export function useDatamodel({ servicePrincipal, connection }: any) {
  //   const [client, setClient] = useState<any>();
  //   const [events, setEvents] = useState<any>();
  //   const [accounts, setAccounts] = useState<any>([]);
  //   const [spaces, setSpaces] = useState<any>([]);
  // update this function any time servicePrincipal or connection change
  //const setupClient =
  useCallback(async () => {
    // const {
    //   client,
    //   //, events
    // } = await createClient({
    //   servicePrincipal,
    //   connection,
    // });
    // setClient(client);
    // setEvents(events);
    // setAccounts(Object.values(client.accounts()));
    // setSpaces(client.spaces());
  }, [servicePrincipal, connection]);
  // run setupClient once each time it changes
  //   useEffect(() => {
  //     setupClient();
  //   }, [setupClient]);
  // set up event listeners to refresh accounts and spaces when
  // the store:save event from @w3ui/core happens
  //   useEffect(() => {
  //     if (client === undefined || events === undefined) return;
  //     const handleStoreSave = () => {
  //       setAccounts(Object.values(client.accounts()));
  //       setSpaces(client.spaces());
  //     };
  //     events.addEventListener(STORE_SAVE_EVENT, handleStoreSave);
  //     return () => {
  //       events?.removeEventListener(STORE_SAVE_EVENT, handleStoreSave);
  //     };
  //   }, [client, events]);
  //   const logout = async () => {
  //     // it's possible that setupClient hasn't been run yet - run createClient here
  //     // to get a reliable handle on the latest store
  //     const { store } = await createClient({
  //       servicePrincipal,
  //       connection,
  //     });
  //     await store.reset();
  //     // set state back to defaults
  //     setClient(undefined);
  //     setEvents(undefined);
  //     setAccounts([]);
  //     setSpaces([]);
  //     // set state up again
  //     await setupClient();
  //   };
  return {
    // client,
    // accounts,
    // spaces,
    // logout,
  };
}

// export function useProvider({ servicePrincipal, connection }: any) {
//   const { client, accounts, spaces, logout } = useDatamodel({
//     servicePrincipal,
//     connection,
//   });

//   return { client, accounts, spaces, logout };
// }

// const ContextDefaultValue = [
//     {
//         client: undefined,
//         accounts: [],
//         spaces: []
//     },
//     {
//         logout: async ()=>{
//             throw new Error('missing logout function');
//         }
//     }
// ];
// const Context = /*#__PURE__*/ createContext(ContextDefaultValue);
// /**
//  * W3UI provider.
//  */ function Provider({ children, servicePrincipal, connection }: any) {
//     const { client, accounts, spaces, logout } = useDatamodel({
//         servicePrincipal,
//         connection
//     });

//     return /*#__PURE__*/ React.createElement(Context.Provider, {
//         value: [
//             {
//                 client,
//                 accounts,
//                 spaces
//             },
//             {
//                 logout
//             }
//         ]
//     }, children);
// }
// /**
//  * Use the scoped core context state from a parent Provider.
//  */ function useW3() {
//     return useContext(Context);
// }

// const AuthenticatorContextDefaultValue = [
//     {
//         accounts: [],
//         spaces: [],
//         submitted: false
//     },
//     {
//         setEmail: ()=>{
//             throw new Error('missing set email function');
//         },
//         cancelLogin: ()=>{
//             throw new Error('missing cancel login function');
//         },
//         logout: ()=>{
//             throw new Error('missing logout function');
//         }
//     }
// ];
// const AuthenticatorContext = /*#__PURE__*/ createContext(AuthenticatorContextDefaultValue);
// /**
//  * Top level component of the headless Authenticator.
//  *
//  * Must be used inside a w3ui Provider.
//  *
//  * Designed to be used by Authenticator.Form, Authenticator.EmailInput
//  * and others to make it easy to implement authentication UI.
//  */ const AuthenticatorRoot = createComponent((props)=>{
//     const [state, actions] = useW3();
//     const { client } = state;
//     const [email, setEmail] = useState('');
//     const [submitted, setSubmitted] = useState(false);
//     const [loginAbortController, setLoginAbortController] = useState();
//     const handleRegisterSubmit = useCallback(async (e)=>{
//         e.preventDefault();
//         const controller = new AbortController();
//         setLoginAbortController(controller);
//         setSubmitted(true);
//         try {
//             if (client === undefined) throw new Error('missing client');
//             await client.login(email, {
//                 signal: controller?.signal
//             });
//         } catch (error) {
//             if (!controller.signal.aborted) {
//                 // eslint-disable-next-line no-console
//                 console.error('failed to register:', error);
//                 throw new Error('failed to register', {
//                     cause: error
//                 });
//             }
//         } finally{
//             setSubmitted(false);
//         }
//     }, [
//         email,
//         setSubmitted
//     ]);
//     const value = useMemo(()=>[
//             {
//                 ...state,
//                 email,
//                 submitted,
//                 handleRegisterSubmit
//             },
//             {
//                 ...actions,
//                 setEmail,
//                 cancelLogin: ()=>{
//                     loginAbortController?.abort();
//                 }
//             }
//         ], [
//         state,
//         actions,
//         email,
//         submitted,
//         handleRegisterSubmit
//     ]);
//     return /*#__PURE__*/ React.createElement(AuthenticatorContext.Provider, {
//         value: value
//     }, createElement(Fragment, props));
// });
// /**
//  * Form component for the headless Authenticator.
//  *
//  * A `form` designed to work with `Authenticator`. Any passed props will
//  * be passed along to the `form` component.
//  */ const AuthenticatorForm = createComponent((props)=>{
//     const [{ handleRegisterSubmit }] = useAuthenticator();
//     return createElement('form', {
//         ...props,
//         onSubmit: handleRegisterSubmit
//     });
// });
// /**
//  * Input component for the headless Uploader.
//  *
//  * An email `input` designed to work with `Authenticator.Form`. Any passed props will
//  * be passed along to the `input` component.
//  */ const AuthenticatorEmailInput = createComponent((props)=>{
//     const [{ email }, { setEmail }] = useAuthenticator();
//     const onChange = useCallback((e)=>{
//         setEmail(e.target.value);
//     }, []);
//     return createElement('input', {
//         ...props,
//         type: 'email',
//         value: email,
//         onChange
//     });
// });
// /**
//  * A button that will cancel login.
//  *
//  * A `button` designed to work with `Authenticator.Form`. Any passed props will
//  * be passed along to the `button` component.
//  */ const AuthenticatorCancelButton = createComponent((props)=>{
//     const [, { cancelLogin }] = useAuthenticator();
//     return createElement('button', {
//         ...props,
//         onClick: cancelLogin
//     });
// });
// /**
//  * Use the scoped authenticator context state from a parent `Authenticator`.
//  */ function useAuthenticator() {
//     return useContext(AuthenticatorContext);
// }
// const Authenticator = Object.assign(AuthenticatorRoot, {
//     Form: AuthenticatorForm,
//     EmailInput: AuthenticatorEmailInput,
//     CancelButton: AuthenticatorCancelButton
// });

// var UploadStatus;
// (function(UploadStatus) {
//     UploadStatus["Idle"] = "idle";
//     UploadStatus["Uploading"] = "uploading";
//     UploadStatus["Failed"] = "failed";
//     UploadStatus["Succeeded"] = "succeeded";
// })(UploadStatus || (UploadStatus = {}));
// const UploaderContextDefaultValue = [
//     {
//         status: "idle",
//         storedDAGShards: [],
//         uploadProgress: {},
//         wrapInDirectory: false,
//         uploadAsCAR: false
//     },
//     {
//         setFile: ()=>{
//             throw new Error('missing set file function');
//         },
//         setFiles: ()=>{
//             throw new Error('missing set files function');
//         },
//         setWrapInDirectory: ()=>{
//             throw new Error('missing set wrap in directory function');
//         },
//         setUploadAsCAR: ()=>{
//             throw new Error('missing set upload as CAR function');
//         }
//     }
// ];
// const UploaderContext = /*#__PURE__*/ createContext(UploaderContextDefaultValue);
// /**
//  * Top level component of the headless Uploader.
//  *
//  * Designed to be used with Uploader.Form and Uploader.Input
//  * to easily create a custom component for uploading files to
//  * web3.storage.
//  */ const UploaderRoot = createComponent(({ onUploadComplete, defaultWrapInDirectory = false, defaultUploadAsCAR = false, ...props })=>{
//     const [{ client }] = useW3();
//     const [files, setFiles] = useState();
//     const file = files?.[0];
//     const setFile = (file)=>{
//         file != null && setFiles([
//             file
//         ]);
//     };
//     const [wrapInDirectory, setWrapInDirectory] = useState(defaultWrapInDirectory);
//     const [uploadAsCAR, setUploadAsCAR] = useState(defaultUploadAsCAR);
//     const [dataCID, setDataCID] = useState();
//     const [status, setStatus] = useState("idle");
//     const [error, setError] = useState();
//     const [storedDAGShards, setStoredDAGShards] = useState([]);
//     const [uploadProgress, setUploadProgress] = useState({});
//     const setFilesAndReset = (files)=>{
//         setFiles(files);
//         setStatus("idle");
//     };
//     const handleUploadSubmit = async (e)=>{
//         e.preventDefault();
//         // file !== undefined should be unecessary but is here to make tsc happy
//         if (client !== undefined && files !== undefined && file !== undefined) {
//             try {
//                 setError(undefined);
//                 setStatus("uploading");
//                 const storedShards = [];
//                 setStoredDAGShards(storedShards);
//                 const uploadOptions = {
//                     onShardStored (meta) {
//                         storedShards.push(meta);
//                         setStoredDAGShards([
//                             ...storedShards
//                         ]);
//                     },
//                     onUploadProgress (status) {
//                         setUploadProgress((statuses)=>({
//                                 ...statuses,
//                                 [status.url ?? '']: status
//                             }));
//                     }
//                 };
//                 const cid = files.length > 1 ? await client.uploadDirectory(files, uploadOptions) : uploadAsCAR ? await client.uploadCAR(file, uploadOptions) : wrapInDirectory ? await client.uploadDirectory(files, uploadOptions) : await client.uploadFile(file, uploadOptions);
//                 setDataCID(cid);
//                 setStatus("succeeded");
//                 if (onUploadComplete !== undefined) {
//                     onUploadComplete({
//                         file,
//                         files,
//                         dataCID: cid
//                     });
//                 }
//             } catch (error_) {
//                 setError(error_);
//                 setStatus("failed");
//             }
//         }
//     };
//     const uploaderContextValue = useMemo(()=>[
//             {
//                 file,
//                 files,
//                 dataCID,
//                 status,
//                 error,
//                 handleUploadSubmit,
//                 storedDAGShards,
//                 uploadProgress,
//                 wrapInDirectory,
//                 uploadAsCAR
//             },
//             {
//                 setFile: (file)=>{
//                     setFilesAndReset(file === undefined ? file : [
//                         file
//                     ]);
//                 },
//                 setFiles: setFilesAndReset,
//                 setWrapInDirectory,
//                 setUploadAsCAR
//             }
//         ], [
//         file,
//         dataCID,
//         status,
//         error,
//         handleUploadSubmit,
//         setFile
//     ]);
//     return /*#__PURE__*/ React.createElement(UploaderContext.Provider, {
//         value: uploaderContextValue
//     }, createElement(Fragment, props));
// });
// /**
//  * Input component for the headless Uploader.
//  *
//  * A file `input` designed to work with `Uploader`. Any passed props will
//  * be passed along to the `input` component.
//  */ const UploaderInput = createComponent(({ allowDirectory, ...props })=>{
//     const [{ uploadAsCAR }, { setFiles }] = useContext(UploaderContext);
//     const onChange = useCallback((e)=>{
//         if (e.target.files != null) {
//             setFiles([
//                 ...e.target.files
//             ]);
//         }
//     }, [
//         setFiles
//     ]);
//     const inputProps = {
//         ...props,
//         type: 'file',
//         onChange
//     };
//     if (allowDirectory === true) {
//         // this attribute behaves weirdly - having it either be the string true or not
//         // set at all seems to be the only way to get it working the way you'd expect
//         inputProps.webkitdirectory = 'true';
//     }
//     const acceptNotSet = inputProps.accept === undefined;
//     if (uploadAsCAR && acceptNotSet) {
//         inputProps.accept = '.car';
//     }
//     return createElement('input', inputProps);
// });
// /**
//  * A checkbox that controls whether the uploader will wrap single files in a directory.
//  */ const WrapInDirectoryCheckbox = createComponent((props)=>{
//     const [{ wrapInDirectory }, { setWrapInDirectory }] = useContext(UploaderContext);
//     const onChange = useCallback((e)=>{
//         setWrapInDirectory(e.target.checked);
//     }, []);
//     return createElement('input', {
//         ...props,
//         type: 'checkbox',
//         checked: wrapInDirectory,
//         onChange
//     });
// });
// /**
//  * Form component for the headless Uploader.
//  *
//  * A `form` designed to work with `Uploader`. Any passed props will
//  * be passed along to the `form` component.
//  */ const UploaderForm = createComponent((props)=>{
//     const [{ handleUploadSubmit }] = useContext(UploaderContext);
//     return createElement('form', {
//         ...props,
//         onSubmit: handleUploadSubmit
//     });
// });
// /**
//  * Use the scoped uploader context state from a parent `Uploader`.
//  */ function useUploader() {
//     return useContext(UploaderContext);
// }
// const Uploader = Object.assign(UploaderRoot, {
//     Input: UploaderInput,
//     Form: UploaderForm
// });

// export { Authenticator, AuthenticatorCancelButton, AuthenticatorContext, AuthenticatorContextDefaultValue, AuthenticatorEmailInput, AuthenticatorForm, AuthenticatorRoot, Context, ContextDefaultValue, Provider, UploadStatus, Uploader, UploaderContext, UploaderContextDefaultValue, UploaderForm, UploaderInput, UploaderRoot, WrapInDirectoryCheckbox, useAuthenticator, useUploader, useW3 };
