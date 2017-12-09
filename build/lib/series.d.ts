import { IIndex } from './index';
import { IDataFrame } from './dataframe';
/**
 * Series configuration.
 */
export interface ISeriesConfig<IndexT, ValueT> {
    values?: ValueT[] | Iterable<ValueT>;
    index?: IndexT[] | Iterable<IndexT>;
    pairs?: Iterable<[IndexT, ValueT]>;
    baked?: boolean;
}
/**
 * A selector function. Transforms a value into another kind of value.
 */
export declare type SelectorFn<FromT, ToT> = (value: FromT, index: number) => ToT;
/**
 * Interface that represents a series of indexed values.
 */
export interface ISeries<IndexT, ValueT> extends Iterable<ValueT> {
    /**
     * Get an iterator to enumerate the values of the series.
     */
    [Symbol.iterator](): Iterator<ValueT>;
    /**
     * Get the index for the series.
     */
    getIndex(): IIndex<IndexT>;
    /**
     * Apply a new index to the Series.
     *
     * @param newIndex The new index to apply to the Series.
     *
     * @returns Returns a new series with the specified index attached.
     */
    withIndex<NewIndexT>(newIndex: NewIndexT[] | Iterable<NewIndexT>): ISeries<NewIndexT, ValueT>;
    /**
     * Resets the index of the series back to the default zero-based sequential integer index.
     *
     * @returns Returns a new series with the index reset to the default zero-based index.
     */
    resetIndex(): ISeries<number, ValueT>;
    /**
    * Extract values from the series as an array.
    * This forces lazy evaluation to complete.
    *
    * @returns Returns an array of values contained within the series.
    */
    toArray(): ValueT[];
    /**
     * Retreive the index and values from the Series as an array of pairs.
     * Each pairs is [index, value].
     *
     * @returns Returns an array of pairs that contains the series content. Each pair is a two element array that contains an index and a value.
     */
    toPairs(): ([IndexT, ValueT])[];
    /**
     * Generate a new series based by calling the selector function on each value.
     *
     * @param selector - Selector function that transforms each value to create a new series or dataframe.
     *
     * @returns Returns a new series that has been transformed by the selector function.
     */
    select<ToT>(selector: SelectorFn<ValueT, ToT>): ISeries<IndexT, ToT>;
    /**
     * Skip a number of values in the series.
     *
     * @param numValues Number of values to skip.
     * @returns Returns a new series with the specified number of values skipped.
     */
    skip(numValues: number): ISeries<IndexT, ValueT>;
    /**
     * Format the series for display as a string.
     * This forces lazy evaluation to complete.
     *
     * @returns Generates and returns a string representation of the series or dataframe.
     */
    toString(): string;
    /**
     * Forces lazy evaluation to complete and 'bakes' the series into memory.
     *
     * @returns Returns a series that has been 'baked', all lazy evaluation has completed.
     */
    bake(): ISeries<IndexT, ValueT>;
    /**
     * Inflate the series to a dataframe.
     *
     * @param [selector] Optional selector function that transforms each value in the series to a row in the new dataframe.
     *
     * @returns Returns a new dataframe that has been created from the input series via the 'selector' function.
     */
    inflate(): IDataFrame<IndexT, ValueT>;
}
/**
 * Class that represents a series of indexed values.
 */
export declare class Series<IndexT, ValueT> implements ISeries<IndexT, ValueT> {
    private index;
    private values;
    private pairs;
    private isBaked;
    private initFromArray(arr);
    private initEmpty();
    private initIterable<T>(input, fieldName);
    private initFromConfig(config);
    /**
     * Create a series.
     *
     * @param config This can be either an array or a config object the sets the values that the series contains.
     * If it is an array it specifies the values that the series contains.
     * If it is a config object that can contain:
     *      values: Optional array or iterable of values that the series contains.
     *      index: Optional array or iterable of values that index the series, defaults to a series of integers from 1 and counting upward.
     *      pairs: Optional iterable of pairs (index and value) that the series contains.
     */
    constructor(config?: ValueT[] | ISeriesConfig<IndexT, ValueT>);
    /**
     * Get an iterator to enumerate the values of the series.
     * Enumerating the iterator forces lazy evaluation to complete.
     */
    [Symbol.iterator](): Iterator<ValueT>;
    /**
     * Get the index for the series.
     */
    getIndex(): IIndex<IndexT>;
    /**
     * Apply a new index to the Series.
     *
     * @param newIndex The new index to apply to the Series.
     *
     * @returns Returns a new series with the specified index attached.
     */
    withIndex<NewIndexT>(newIndex: IIndex<NewIndexT> | ISeries<any, NewIndexT> | NewIndexT[]): ISeries<NewIndexT, ValueT>;
    /**
     * Resets the index of the series back to the default zero-based sequential integer index.
     *
     * @returns Returns a new series with the index reset to the default zero-based index.
     */
    resetIndex(): ISeries<number, ValueT>;
    /**
    * Extract values from the series as an array.
    * This forces lazy evaluation to complete.
    *
    * @returns Returns an array of values contained within the series.
    */
    toArray(): any[];
    /**
     * Retreive the index and values from the Series as an array of pairs.
     * Each pair is [index, value].
     * This forces lazy evaluation to complete.
     *
     * @returns Returns an array of pairs that contains the series content. Each pair is a two element array that contains an index and a value.
     */
    toPairs(): ([IndexT, ValueT])[];
    /**
     * Generate a new series based by calling the selector function on each value.
     *
     * @param selector - Selector function that transforms each value to create a new series.
     *
     * @returns Returns a new series that has been transformed by the selector function.
     */
    select<ToT>(selector: SelectorFn<ValueT, ToT>): ISeries<IndexT, ToT>;
    /**
     * Skip a number of values in the series.
     *
     * @param numValues - Number of values to skip.     *
     * @returns Returns a new series or dataframe with the specified number of values skipped.
     */
    skip(numValues: number): ISeries<IndexT, ValueT>;
    /**
     * Format the series for display as a string.
     * This forces lazy evaluation to complete.
     *
     * @returns Generates and returns a string representation of the series or dataframe.
     */
    toString(): string;
    /**
     * Forces lazy evaluation to complete and 'bakes' the series into memory.
     *
     * @returns Returns a series that has been 'baked', all lazy evaluation has completed.
     */
    bake(): ISeries<IndexT, ValueT>;
    /**
     * Inflate the series to a dataframe.
     *
     * @param [selector] Optional selector function that transforms each value in the series to a row in the new dataframe.
     *
     * @returns Returns a new dataframe that has been created from the input series via the 'selector' function.
     */
    inflate(): IDataFrame<IndexT, ValueT>;
}