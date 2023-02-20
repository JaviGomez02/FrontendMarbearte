import { Product } from './product.interface';
import { Pageable } from './pageable.interface';
import { Sort } from './sort.interface';

export interface Page {
    content:          Product[];
    pageable:         Pageable;
    last:             boolean;
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}