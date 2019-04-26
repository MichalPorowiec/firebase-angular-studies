import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface MenuRoute {
    name: string;
    icon: IconDefinition;
    isActive?: boolean;
    routerLink: string;
}
