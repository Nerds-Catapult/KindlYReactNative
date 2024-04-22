declare module "*.svg"
declare module "*.png"
declare module "*.jpg"

declare module 'react-native-vector-icons/FontAwesome' {
    import {Icon} from 'react-native-vector-icons/Icon'

    type FontAwesomeIcon = Icon

    enum FontAwesomeIcons {}
    export {FontAwesomeIcon, FontAwesomeIcons}
}