import { Logger, PerformanceEvents, IPerformanceClient, PerformanceClient, IPerformanceMeasurement, InProgressPerformanceEvent, ApplicationTelemetry } from "@azure/msal-common";
import { CryptoOptions } from "../config/Configuration";
export declare class BrowserPerformanceClient extends PerformanceClient implements IPerformanceClient {
    private browserCrypto;
    private guidGenerator;
    constructor(clientId: string, authority: string, logger: Logger, libraryName: string, libraryVersion: string, applicationTelemetry: ApplicationTelemetry, cryptoOptions: CryptoOptions);
    startPerformanceMeasuremeant(measureName: string, correlationId: string): IPerformanceMeasurement;
    generateId(): string;
    private getPageVisibility;
    /**
     * Starts measuring performance for a given operation. Returns a function that should be used to end the measurement.
     * Also captures browser page visibilityState.
     *
     * @param {PerformanceEvents} measureName
     * @param {?string} [correlationId]
     * @returns {((event?: Partial<PerformanceEvent>) => PerformanceEvent| null)}
     */
    startMeasurement(measureName: PerformanceEvents, correlationId?: string): InProgressPerformanceEvent;
}
//# sourceMappingURL=BrowserPerformanceClient.d.ts.map