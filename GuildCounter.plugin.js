//META{"name":"GuildCounter","website":"https://github.com/Metalloriff/BetterDiscordPlugins/blob/master/README.md","source":"https://github.com/Metalloriff/BetterDiscordPlugins/blob/master/GuildCounter.plugin.js"}*//

class GuildCounter {
	
    getName() { return "Guild Counter"; }
    getDescription() { return "Displays a guild counter below the online friend counter."; }
    getVersion() { return "1.0.1"; }
    getAuthor() { return "Metalloriff"; }

    load() {}

    start() {

        let libLoadedEvent = () => {
            try{ this.onLibLoaded(); }
            catch(err) { console.error(this.getName(), "fatal error, plugin could not be started!", err); try { this.stop(); } catch(err) { console.error(this.getName() + ".stop()", err); } }
        };

		let lib = document.getElementById("NeatoBurritoLibrary");
		if(!lib) {
			lib = document.createElement("script");
			lib.id = "NeatoBurritoLibrary";
			lib.type = "text/javascript";
			lib.src = "https://rawgit.com/Metalloriff/BetterDiscordPlugins/master/Lib/NeatoBurritoLibrary.js";
			document.head.appendChild(lib);
		}
		this.forceLoadTimeout = setTimeout(libLoadedEvent, 30000);
        if(typeof window.NeatoLib !== "undefined") libLoadedEvent();
		else lib.addEventListener("load", libLoadedEvent);

	}
	
	onLibLoaded(){

		NeatoLib.Updates.check(this);

		this.count = () => {

			let existing = document.getElementById("gc-counter"), count = Object.keys(NeatoLib.Modules.get("getGuilds").getGuilds()).length;
	
			if(existing) existing.innerText = count + " guilds";
			else this.guildsScroller.insertBefore(NeatoLib.DOM.createElement({ id : "gc-counter", className : "friends-online", innerText : count + " guilds" }), this.guildsScroller.getElementsByClassName("dms")[0]);

		};

		(this.guildsScroller = document.getElementsByClassName("guilds scroller")[0]).addEventListener("DOMNodeInserted", this.count);

		this.count();

		NeatoLib.Events.onPluginLoaded(this);

	}
	
    stop() {
		this.guildsScroller.removeEventListener("DOMNodeInserted", this.count);
		document.getElementById("gc-counter").remove();
	}
	
}
