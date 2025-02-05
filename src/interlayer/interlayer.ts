import { interlayer } from "./index";
import { watch } from "vue";


const _routerEvent = () => {
  interlayer.$on("useRouter", (routename: string) => {
    
  })
}

const _viewEvent = () => {

}

const _divEvent = () => {
  interlayer.$on("createDiv", (div: any) => {
    interlayer.$emit("randerDiv",div.b);
  })


}

const _storeEvent = () => {

}

const _axiosEvent = () => {

}

const _testEvent = () => {

}

const __init__ = () => {
  _routerEvent();
  _viewEvent();
  _storeEvent();
  _axiosEvent();
  _testEvent();
  _divEvent();
}

__init__()

