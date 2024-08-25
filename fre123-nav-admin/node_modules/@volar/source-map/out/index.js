"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceMap = exports.SourceMapBase = exports.Mode = void 0;
var Mode;
(function (Mode) {
    /**
     * @case1
     * 123456 -> abcdef
     * ^    ^    ^    ^
     * @case2
     * 123456 -> abcdef
     *  ^  ^      ^  ^
     * @case3
     * 123456 -> abcdef
     *   ^^        ^^
     */
    Mode[Mode["Offset"] = 0] = "Offset";
    /**
     * @case1
     * 123456 -> abcdef
     * ^    ^    ^    ^
     * @case2
     * 123456 -> abcdef
     *  ^  ^     NOT_MATCH
     * @case3
     * 123456 -> abcdef
     *   ^^      NOT_MATCH
     */
    Mode[Mode["Totally"] = 1] = "Totally";
    /**
     * @case1
     * 123456 -> abcdef
     * ^    ^    ^    ^
     * @case2
     * 123456 -> abcdef
     *  ^  ^     ^    ^
     * @case3
     * 123456 -> abcdef
     *   ^^      ^    ^
     */
    Mode[Mode["Expand"] = 2] = "Expand";
})(Mode = exports.Mode || (exports.Mode = {}));
class SourceMapBase {
    constructor(_mappings) {
        this.mappings = _mappings !== null && _mappings !== void 0 ? _mappings : [];
    }
    getSourceRange(start, end, filter) {
        for (const maped of this.getRanges(start, end !== null && end !== void 0 ? end : start, false, filter)) {
            return maped;
        }
    }
    getMappedRange(start, end, filter) {
        for (const maped of this.getRanges(start, end !== null && end !== void 0 ? end : start, true, filter)) {
            return maped;
        }
    }
    getSourceRanges(start, end, filter) {
        return this.getRanges(start, end !== null && end !== void 0 ? end : start, false, filter);
    }
    getMappedRanges(start, end, filter) {
        return this.getRanges(start, end !== null && end !== void 0 ? end : start, true, filter);
    }
    *getRanges(startOffset, endOffset, sourceToTarget, filter) {
        for (const mapping of this.mappings) {
            if (filter && !filter(mapping.data))
                continue;
            const maped = this.getRange(startOffset, endOffset, sourceToTarget, mapping.mode, mapping.sourceRange, mapping.mappedRange, mapping.data);
            if (maped) {
                yield getMaped(maped);
            }
            else if (mapping.additional) {
                for (const other of mapping.additional) {
                    const maped = this.getRange(startOffset, endOffset, sourceToTarget, other.mode, other.sourceRange, other.mappedRange, mapping.data);
                    if (maped) {
                        yield getMaped(maped);
                        break; // only return first match additional range
                    }
                }
            }
        }
        function getMaped(maped) {
            return maped;
        }
    }
    getRange(start, end, sourceToTarget, mode, sourceRange, targetRange, data) {
        const mapedToRange = sourceToTarget ? targetRange : sourceRange;
        const mapedFromRange = sourceToTarget ? sourceRange : targetRange;
        if (mode === Mode.Totally) {
            if (start === mapedFromRange.start && end === mapedFromRange.end) {
                const _start = mapedToRange.start;
                const _end = mapedToRange.end;
                return [{
                        start: Math.min(_start, _end),
                        end: Math.max(_start, _end),
                    }, data];
            }
        }
        else if (mode === Mode.Offset) {
            if (start >= mapedFromRange.start && end <= mapedFromRange.end) {
                const _start = mapedToRange.start + start - mapedFromRange.start;
                const _end = mapedToRange.end + end - mapedFromRange.end;
                return [{
                        start: Math.min(_start, _end),
                        end: Math.max(_start, _end),
                    }, data];
            }
        }
        else if (mode === Mode.Expand) {
            if (start >= mapedFromRange.start && end <= mapedFromRange.end) {
                const _start = mapedToRange.start;
                const _end = mapedToRange.end;
                return [{
                        start: Math.min(_start, _end),
                        end: Math.max(_start, _end),
                    }, data];
            }
        }
    }
}
exports.SourceMapBase = SourceMapBase;
class SourceMap extends SourceMapBase {
    constructor(sourceDocument, mappedDocument, _mappings) {
        super(_mappings);
        this.sourceDocument = sourceDocument;
        this.mappedDocument = mappedDocument;
        this._mappings = _mappings;
    }
    getSourceRange(start, end, filter) {
        for (const maped of this.getRanges(start, end !== null && end !== void 0 ? end : start, false, filter)) {
            return maped;
        }
    }
    getMappedRange(start, end, filter) {
        for (const maped of this.getRanges(start, end !== null && end !== void 0 ? end : start, true, filter)) {
            return maped;
        }
    }
    getSourceRanges(start, end, filter) {
        return this.getRanges(start, end !== null && end !== void 0 ? end : start, false, filter);
    }
    getMappedRanges(start, end, filter) {
        return this.getRanges(start, end !== null && end !== void 0 ? end : start, true, filter);
    }
    *getRanges(start, end, sourceToTarget, filter) {
        const startIsNumber = typeof start === 'number';
        const endIsNumber = typeof end === 'number';
        const toDoc = sourceToTarget ? this.mappedDocument : this.sourceDocument;
        const fromDoc = sourceToTarget ? this.sourceDocument : this.mappedDocument;
        const startOffset = startIsNumber ? start : fromDoc.offsetAt(start);
        const endOffset = endIsNumber ? end : fromDoc.offsetAt(end);
        for (const maped of super.getRanges(startOffset, endOffset, sourceToTarget, filter)) {
            yield getMaped(maped);
        }
        function getMaped(maped) {
            if (startIsNumber) {
                return maped;
            }
            return [{
                    start: toDoc.positionAt(maped[0].start),
                    end: toDoc.positionAt(maped[0].end),
                }, maped[1]];
        }
    }
}
exports.SourceMap = SourceMap;
//# sourceMappingURL=index.js.map