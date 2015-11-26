define(['couche', 'aide'], function(Couche, Aide) {
 
    function ArcGIS93Rest(options){
        this.options = options || {};

        if (!this.options.titre || !this.options.url || !this.options.nom) {
            throw new Error("Igo.ArcGIS93Rest a besoin d'un titre, d'un url et d'un nom");
        }

        if(this.options.nom.substr(0,5) !== 'show:'){
        	this.options.nom = 'show:' + this.options.nom;
        }

        this._optionsOL = this.options._optionsOL || {
            maxZoomLevel: options.zoomMax==null?null:Number(options.zoomMax),
            minZoomLevel: options.zoomMin==null?null:Number(options.zoomMin),
            transparent: this.options.fond ? false : true
        };
        
        if(Aide.toBoolean(this.options.utiliserProxy)){
            this.options.url=Aide.utiliserProxy(this.options.url, true);
        }
        
        this._init();
    };
    
    
    ArcGIS93Rest.prototype = new Couche();
    ArcGIS93Rest.prototype.constructor = ArcGIS93Rest;

    /** 
     * Initialisation de l'object XYZ.
     * Appelé lors de la création.
     * @method 
     * @private
     * @name Couche.XYZ#_init
    */
    ArcGIS93Rest.prototype._init = function(){
        Couche.prototype._init.call(this);

        this._layer = new OpenLayers.Layer.ArcGIS93Rest(
            this.options.titre,
            this.options.url,
            this._optionsOL
        );
    };
    
    return ArcGIS93Rest;
    
});