// ==UserScript==
// @name         SpankBang - Search and UI Enhancer
// @namespace    brazenvoid
// @version      1.6.0
// @author       brazenvoid
// @license      GPL-3.0-only
// @description  Various search filters and user experience enhancers
// @match        https://spankbang.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js
// @require      https://greasyfork.org/scripts/375557-base-resource/code/Base%20Resource.js?version=899286
// @require      https://greasyfork.org/scripts/416104-brazen-ui-generator/code/Brazen%20UI%20Generator.js?version=899448
// @require      https://greasyfork.org/scripts/418665-brazen-configuration-manager/code/Brazen%20Configuration%20Manager.js?version=1163542
// @require      https://greasyfork.org/scripts/429587-brazen-item-attributes-resolver/code/Brazen%20Item%20Attributes%20Resolver.js?version=1139392
// @require      https://greasyfork.org/scripts/416105-brazen-base-search-enhancer/code/Brazen%20Base%20Search%20Enhancer.js?version=1163543
// @grant        GM_addStyle
// @run-at       document-end
// ==/UserScript==

GM_addStyle(
    `button.show-settings{height:60vh;top:20vh}#settings-wrapper{top:20vh;width:300px}.bg-brand{background-color:#69150d}.font-primary{color:white}.font-secondary{color:black}hr{background:white}`)

const PAGE_PATH_NAME = window.location.pathname
const PAGE_PATH_FRAGMENTS = PAGE_PATH_NAME.split('/')

const IS_HOME_PAGE = PAGE_PATH_NAME === '/'
const IS_VIDEO_PAGE = $('#video').length > 0
const IS_PLAYLIST_PAGE = !IS_VIDEO_PAGE && PAGE_PATH_FRAGMENTS[2] === 'playlist'
const IS_PROFILE_PAGE = PAGE_PATH_FRAGMENTS[1] === 'profile'
const IS_SEARCH_PAGE = PAGE_PATH_FRAGMENTS[1] === 's' || PAGE_PATH_FRAGMENTS[1] === 'tag'

// Configuration

const FILTER_VIDEOS_RESOLUTION = 'Resolutions'
const FILTER_VIDEOS_DURATION = 'Duration'
const FILTER_VIDEOS_MAXIMUM_AGE = 'Maximum Age'
const FILTER_VIDEOS_MINIMUM_AGE = 'Minimum Age'
const FILTER_VIDEOS_RATED = 'Rated'
const FILTER_VIDEOS_RATING = 'Rating'
const FILTER_VIDEOS_VIEWS = 'Views'

const UI_REMOVE_AD_BOX_VIDEO_LISTS = 'Remove Ad in Video Lists'
const UI_REMOVE_EMBED_VIDEO_SECTION = 'Remove Embed Video Section'
const UI_REMOVE_LIVE_MODEL_SECTIONS = 'Remove Live Model Sections'
const UI_REDIRECT_SUBSCRIPTIONS_LINK = 'Redirect Subscriptions Link'
const UI_REPOSITION_SCREENSHOTS = 'Reposition Video Screenshots'
const UI_REPOSITION_VIDEO_DETAILS = 'Reposition Video Details'
const UI_SWAP_RELATED_VIDEOS = 'Reposition Related Videos'

// Item attributes

const ITEM_DURATION = 'duration'
const ITEM_RATING = 'rating'
const ITEM_RESOLUTION = 'resolution'
const ITEM_VIEWS = 'views'

class SpankBangSearchAndUIEnhancer extends BrazenBaseSearchEnhancer
{
    constructor()
    {
        super({
            isUserLoggedIn:           $('.links > .auth').length > 0,
            itemDeepAnalysisSelector: '.searches,.video_toolbar',
            itemLinkSelector:         'a.n,a.thumb',
            itemListSelectors:        'div.video-list',
            itemNameSelector:         '.n',
            itemSelectors:            'div.video-item:not(.clear-fix)',
            requestDelay:             0,
            scriptPrefix:             'sb-sui-',
        })
        
        this._configurationManager
            .addFlagField(FILTER_VIDEOS_RATED, 'Closes tab of already rated videos.')
            .addFlagField(UI_REMOVE_AD_BOX_VIDEO_LISTS, 'Removes the ad box found in the first row of videos lists.')
            .addFlagField(UI_REMOVE_EMBED_VIDEO_SECTION, 'Removes embed video section on video pages.')
            .addFlagField(UI_REMOVE_LIVE_MODEL_SECTIONS, 'Removes live model sections from the site.')
            .addFlagField(UI_REDIRECT_SUBSCRIPTIONS_LINK, 'Redirects subscription videos page shortcut on user bar to new subscribed videos view.')
            .addFlagField(UI_REPOSITION_SCREENSHOTS, 'Move video screenshots above video player on video pages.')
            .addFlagField(UI_REPOSITION_VIDEO_DETAILS, 'Move video details section to the top of the right pane.')
            .addFlagField(UI_SWAP_RELATED_VIDEOS, 'Swaps related videos section with comments section')
            .addNumberField(FILTER_VIDEOS_MAXIMUM_AGE, 0, 100, 'Maximum age filter value.')
            .addNumberField(FILTER_VIDEOS_MINIMUM_AGE, 0, 100, 'Minimum age filter value.')
            .addCheckboxesGroup(FILTER_VIDEOS_RESOLUTION, [
                ['SD', 'SD'],
                ['720p', '720p'],
                ['1080p', '1080p'],
                ['4k', '4k'],
            ], 'Filter videos by resolution.')
            .addRangeField(FILTER_VIDEOS_DURATION, 0, 100000, 'Filter videos by duration in minutes.')
            .addRangeField(FILTER_VIDEOS_RATING, 0, 100, 'Filter videos by duration.')
            .addRangeField(FILTER_VIDEOS_VIEWS, 0, 9999999999, 'Filter videos by view count.')
        
        this._itemAttributesResolver
            .addAttribute(ITEM_DURATION, (item) => {
                let durationBadge = item.find('span.l')
                return durationBadge.length ? parseInt(durationBadge.text().replace('m', '')) : null
            })
            .addAttribute(ITEM_RATING, (item) => {
                let stats = item.find('div.stats > .v.d')
                if (stats.length) {
                    let rating = stats.html().trim().split(' &nbsp; ')[1]
                    if (rating !== '') {
                        return parseInt(rating)
                    }
                }
                return null
            })
            .addAttribute(ITEM_RESOLUTION, (item) => {
                let resolutionBadge = item.find('span.h')
                return resolutionBadge.length ? resolutionBadge.text() : 'SD'
            })
            .addAttribute(ITEM_VIEWS, (item) => {
                let stats = item.find('div.stats > .v.d')
                if (stats.length) {
                    let viewsString = stats.html().trim().split(' &nbsp; ')[1]
                    if (viewsString !== '') {
                        let viewsAmount = parseInt(viewsString.replace('K', '').replace('M', '').replace('B', ''))
                        if (viewsString.endsWith('K')) {
                            viewsAmount *= 1000
                        } else {
                            if (viewsString.endsWith('M')) {
                                viewsAmount *= 1000000
                            } else {
                                if (viewsString.endsWith('B')) {
                                    viewsAmount *= 1000000000
                                }
                            }
                        }
                        return viewsAmount
                    }
                }
                return null
            })
        
        this._setupUI()
        this._setupComplianceFilters()
    }
    
    /**
     * @private
     */
    _closeTabOfRatedVideo()
    {
        if (this._configurationManager.getValue(FILTER_VIDEOS_RATED) && $('.video_toolbar > .rt .i_svg.i_check').length) {
            top.close()
        }
    }
    
    /**
     * @return {JQuery<HTMLElement> | jQuery | HTMLElement}
     * @private
     */
    _generatePseudoLeftSection()
    {
        return $('<div class="left" style="padding: 23px 0 0 0"></div>')
    }
    
    /**
     * @private
     */
    _openVideo(items, index, delay) {
        Utilities.sleep(delay).then(() => {
            window.open(items.eq(index).find(this._config.itemLinkSelector).attr('href'))
            index++
            if (items.length !== index) {
                this._openVideo(items, index, delay)
            }
        })
    }
    
    /**
     * @private
     */
    _openVideos()
    {
        let listWrapSelector
        if (IS_SEARCH_PAGE || IS_PLAYLIST_PAGE) {
            listWrapSelector = '.results_search'
        } else if (IS_PROFILE_PAGE) {
            listWrapSelector = '.data'
        } else if (IS_VIDEO_PAGE) {
            listWrapSelector = '.user_uploads'
        }
        let items = $(listWrapSelector + ' > ' + this._config.itemListSelectors + ' > ' + this._config.itemSelectors + ':not(.noncompliant-item)')
        if (items.length) {
            this._openVideo(items, 0, 100)
        }
    }
    
    /**
     * @private
     */
    _redirectSubscriptionsLink()
    {
        if (this._configurationManager.getValue(UI_REDIRECT_SUBSCRIPTIONS_LINK)) {
            $('a[href="/users/social"]').attr('href', '/users/social?sort=new')
        }
    }
    
    _removeAdBoxInVideoLists()
    {
        if (this._configurationManager.getValue(UI_REMOVE_AD_BOX_VIDEO_LISTS)) {
            $('div.video-item ins').parent().remove()
        }
    }
    
    /**
     * @private
     */
    _removeEmbedVideoSection()
    {
        if (this._configurationManager.getValue(UI_REMOVE_EMBED_VIDEO_SECTION)) {
            $('.embed').remove()
        }
    }
    
    /**
     * @private
     */
    _removeLiveModelSections()
    {
        if (this._configurationManager.getValue(UI_REMOVE_EMBED_VIDEO_SECTION)) {
            let liveModelsSection = $('.lv_cm_cl_mx_why')
            if (IS_HOME_PAGE) {
                liveModelsSection.prev().remove()
                liveModelsSection.next().remove()
            }
            liveModelsSection.remove()
        }
    }
    
    /**
     * @private
     */
    _repositionVideoDetails()
    {
        if (this._configurationManager.getValue(UI_REPOSITION_VIDEO_DETAILS)) {
            let rightPane = $('div.right')
            
            let pseudoLeftSection = this._generatePseudoLeftSection()
            rightPane.prepend(pseudoLeftSection)
            pseudoLeftSection.append($('div.left section.details'))
        }
    }
    
    /**
     * @private
     */
    _repositionVideoScreenshots()
    {
        if (this._configurationManager.getValue(UI_REPOSITION_SCREENSHOTS)) {
            $('div.left section.timeline').insertBefore('#player_wrapper_outer')
        }
    }
    
    /**
     * @private
     */
    _setupComplianceFilters()
    {
        this._addItemTextSanitizationFilter(
            'Censor video names by substituting offensive phrases. Each rule in separate line with comma separated target phrases. Example Rule: boyfriend=stepson,stepdad')
        this._addItemWhitelistFilter(
            'Show videos with specified phrases in their names. Separate the phrases with line breaks.')
        this._addItemTextSearchFilter()
        this._addItemComplianceFilter(FILTER_VIDEOS_RATING, ITEM_RATING)
        this._addItemComplianceFilter(FILTER_VIDEOS_DURATION, ITEM_DURATION)
        this._addItemComplianceFilter(FILTER_VIDEOS_VIEWS, ITEM_VIEWS)
        this._addItemComplianceFilter(
            FILTER_VIDEOS_RESOLUTION, (item, values) => values.join('').includes(this._get(item, ITEM_RESOLUTION)))
        this._addItemBlacklistFilter(
            'Hide videos with specified phrases in their names. Separate the phrases with line breaks.')
    }
    
    /**
     * @private
     */
    _setupUI()
    {
        this._onBeforeUIBuild = () => {
            if (IS_VIDEO_PAGE) {
                this._closeTabOfRatedVideo()
                this._removeEmbedVideoSection()
                this._repositionVideoDetails()
                this._repositionVideoScreenshots()
                this._swapRelatedVideos()
                Validator.sanitizeNodeOfSelector(
                    'div.video > div.left > h1', this._configurationManager.getFieldOrFail(FILTER_TEXT_SANITIZATION).optimized)
            }
            this._redirectSubscriptionsLink()
            this._removeLiveModelSections()
            this._removeAdBoxInVideoLists()
        }
        
        this._onUIBuild = () =>
            this._uiGen.createSettingsSection().append([
                this._uiGen.createTabsSection(['Filters', 'Text', 'UI', 'Global'], [
                    this._uiGen.createTabPanel('Filters', true).append([
                        this._configurationManager.createElement(FILTER_VIDEOS_DURATION),
                        this._configurationManager.createElement(FILTER_VIDEOS_RATING),
                        this._configurationManager.createElement(FILTER_VIDEOS_VIEWS),
                        this._configurationManager.createElement(FILTER_VIDEOS_RATED),
                        this._uiGen.createSeparator(),
                        this._configurationManager.createElement(FILTER_VIDEOS_RESOLUTION),
                        this._uiGen.createSeparator(),
                        this._uiGen.createFormButton('Open Videos', 'Opens all filtered videos in new tabs successively', () => {this._openVideos()}),
                        this._uiGen.createSeparator(),
                        this._configurationManager.createElement(OPTION_DISABLE_COMPLIANCE_VALIDATION),
                        this._uiGen.createSeparator(),
                        this._uiGen.createStatisticsFormGroup(FILTER_VIDEOS_DURATION),
                        this._uiGen.createStatisticsFormGroup(FILTER_VIDEOS_RATING),
                        this._uiGen.createStatisticsFormGroup(FILTER_VIDEOS_VIEWS),
                        this._uiGen.createStatisticsFormGroup(FILTER_VIDEOS_RESOLUTION),
                        this._uiGen.createStatisticsFormGroup(FILTER_TEXT_SEARCH),
                        this._uiGen.createStatisticsFormGroup(FILTER_TEXT_BLACKLIST),
                        this._uiGen.createStatisticsFormGroup(FILTER_TEXT_WHITELIST),
                        this._uiGen.createSeparator(),
                        this._uiGen.createStatisticsTotalsGroup(),
                    ]),
                    this._uiGen.createTabPanel('Text').append([
                        this._configurationManager.createElement(FILTER_TEXT_SEARCH),
                        this._configurationManager.createElement(FILTER_TEXT_BLACKLIST),
                        this._configurationManager.createElement(FILTER_TEXT_WHITELIST),
                        this._configurationManager.createElement(FILTER_TEXT_SANITIZATION),
                    ]),
                    this._uiGen.createTabPanel('UI').append([
                        this._configurationManager.createElement(UI_REMOVE_AD_BOX_VIDEO_LISTS),
                        this._configurationManager.createElement(UI_REDIRECT_SUBSCRIPTIONS_LINK),
                        this._configurationManager.createElement(UI_REMOVE_EMBED_VIDEO_SECTION),
                        this._configurationManager.createElement(UI_REMOVE_LIVE_MODEL_SECTIONS),
                        this._configurationManager.createElement(UI_SWAP_RELATED_VIDEOS),
                        this._configurationManager.createElement(UI_REPOSITION_VIDEO_DETAILS),
                        this._configurationManager.createElement(UI_REPOSITION_SCREENSHOTS),
                        this._uiGen.createSeparator(),
                        this._configurationManager.createElement(OPTION_ALWAYS_SHOW_SETTINGS_PANE),
                    ]),
                    this._uiGen.createTabPanel('Global').append([
                        this._createSettingsBackupRestoreFormActions(),
                    ]),
                ]),
                this._createSettingsFormActions(),
                this._uiGen.createSeparator(),
                this._uiGen.createStatusSection(),
            ])
        
        this._onAfterUIBuild = () => {
            this._uiGen.getSelectedSection()[0].userScript = this
        }
    }
    
    /**
     * @private
     */
    _swapRelatedVideos()
    {
        if (this._configurationManager.getValue(UI_SWAP_RELATED_VIDEOS)) {
            let newRelatedVideosSection = $('<section class="user_uploads"></section>')
            newRelatedVideosSection.insertAfter('section.all_comments')
            newRelatedVideosSection.append('<h2>Similar Videos</h2>')
            newRelatedVideosSection.append($('.similar div.video-list'))
            $('.similar').remove()
            
            let pseudoLeftSection = this._configurationManager.getValue(UI_REPOSITION_VIDEO_DETAILS)
                ? $('div.right div.left')
                : this._generatePseudoLeftSection()
            pseudoLeftSection.append($('section.all_comments'))
        }
    }
}

(new SpankBangSearchAndUIEnhancer).init()